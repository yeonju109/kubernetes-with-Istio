pipeline {
    agent any
    environment{
        REGION = 'ap-northeast-2'
        // ECR로 가서 Repository의 URI을 가져오되 /repository-name 은 제거
        ECR_PATH = '*********.dkr.ecr.ap-northeast-2.amazonaws.com'
        // ECR 이미지 이름
        FRONT_IMAGE = 'frontend'
        USER_IMAGE = 'user-service'
        PRODUCT_IMAGE = 'product-service'
        ORDER_IMAGE = 'order-service'    
        CART_IMAGE = 'cart-service'
        RATING_IMAGE = 'rating-service'
        TAG = 'project'
        AWS_CREDENTIAL_ID = 'aws-credential'
        GITHUB_CREDENTIAL = 'github-ssh'
        GIT_EMAIL = 'yeonju7548@naver.com'
        GIT_USERNAME = 'yeonju109'
        
    }
    stages{
        stage("clone"){
            steps{
                // git 계정 로그인, 해당 레포지토리의 main 브랜치에서 클론
                git([url: 'https://github.com/yeonju109/kubernetes-with-Istio.git', branch: 'main', credentialsId: 'github'])
            }
            // steps 가 끝날 경우 실행한다.
            // steps 가 실패할 경우에는 failure 를 실행하고 성공할 경우에는 success 를 실행한다.
            post {
                failure {
                echo 'Repository clone failure' 
                }
                success {
                echo 'Repository clone success' 
                }
            }
        }
        stage("image build and push"){
            steps{
                script{
                     dir('product'){
                         docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
                         def product_image = docker.build("${ECR_PATH}/${PRODUCT_IMAGE}")
                         product_image.push("v${env.BUILD_NUMBER}")
                         }
                     }

                   dir('front-shop'){
                       docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
                       def front_image = docker.build("${ECR_PATH}/${FRONT_IMAGE}")
                       front_image.push("v${env.BUILD_NUMBER}")
                       }
                   }

                    dir('account'){
                        docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
                        def user_image = docker.build("${ECR_PATH}/${USER_IMAGE}")
                        user_image.push("v${env.BUILD_NUMBER}")
                        }
                    }

                    dir('order'){
                        docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
                        def order_image = docker.build("${ECR_PATH}/${ORDER_IMAGE}")
                        order_image.push("v${env.BUILD_NUMBER}")
                        }
                    }

                    dir('cart'){
                        docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
                        def cart_image = docker.build("${ECR_PATH}/${CART_IMAGE}")
                        cart_image.push("v${env.BUILD_NUMBER}")
                        }
                    }

                    dir('rating'){
                        docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
                        def rating_image = docker.build("${ECR_PATH}/${RATING_IMAGE}")
                        rating_image.push("v${env.BUILD_NUMBER}")
                        }
                    }
                }
            }
        }
         stage('CleanUp Images'){
             steps{
                sh"""
                docker rmi ${ECR_PATH}/${PRODUCT_IMAGE}:v${BUILD_NUMBER}
                docker rmi ${ECR_PATH}/${PRODUCT_IMAGE}:latest
                docker rmi ${ECR_PATH}/${FRONT_IMAGE}:v${BUILD_NUMBER}
                docker rmi ${ECR_PATH}/${FRONT_IMAGE}:latest
                docker rmi ${ECR_PATH}/${USER_IMAGE}:v${BUILD_NUMBER}
                docker rmi ${ECR_PATH}/${USER_IMAGE}:latest
                docker rmi ${ECR_PATH}/${ORDER_IMAGE}:v${BUILD_NUMBER}
                docker rmi ${ECR_PATH}/${ORDER_IMAGE}:latest
                docker rmi ${ECR_PATH}/${CART_IMAGE}:v${BUILD_NUMBER}
                docker rmi ${ECR_PATH}/${CART_IMAGE}:latest
                docker rmi ${ECR_PATH}/${RATING_IMAGE}:v${BUILD_NUMBER}
                docker rmi ${ECR_PATH}/${RATING_IMAGE}:latest
                """
             }
         }
        // 아래 작업은 운영환경의 Manifest 파일을 업데이트, 이미지 태그 변경 후 메인 브렌치에 푸시
        stage("update manifest"){
            steps{
              git credentialsId: 'github-ssh',
                  url: 'git@github.com:yeonju109/kubernetes_with_Istio_Helm.git',
                  branch: 'main'
              sh "git config --global user.email ${GIT_EMAIL}"
              sh "git config --global user.name ${GIT_USERNAME}"
              // dir을 통해 Manifest를 update하는 환경의 폴더로 이동
              dir('PRD/version'){        
                echo "update yamls"
                // value_init.yaml 파일 내에서 {TAG} 값의 문자열을 찾아 해당 문자열을 'v{BUILD_NUMBER}' 로 대체하는 작업 수행 
                sh "sed 's/${TAG}/v${BUILD_NUMBER}/' value_init.yaml > value_v${BUILD_NUMBER}.yaml" 
                // value_v${BUILD_NUMBER}.yaml의 업데이트 된 내용을 Values.yaml에 반영
                sh 'rm ../values.yaml'
                sh "cp value_v${BUILD_NUMBER}.yaml ../values.yaml"
	          }
	          dir('PRD'){
	            sh 'git add . '
                sh 'git commit -m "commit manifest4"'
                sh 'git push origin main'
              }
            }         
        }
    }
}
