pipeline {
    agent any
    environment{
        REGION = 'ap-northeast-2'
        ECR_PATH = '381491981365.dkr.ecr.ap-northeast-2.amazonaws.com'
        AWS_CREDENTIAL_ID = 'aws-credential'
        FRONT_IMAGE = 'frontend'
        USER_IMAGE = 'user-service'
        PRODUCT_IMAGE = 'product-service'
        ORDER_IMAGE = 'order-service'    
        CART_IMAGE = 'cart-service'
        RATING_IMAGE = 'rating-service'
        TAG = 'project'
        GITHUB_CREDENTIAL = 'github-ssh'
        GIT_EMAIL = 'yeonju7548@naver.com'
        GIT_USERNAME = 'yeonju109'
        
    }
    stages{
        stage("clone"){
            steps{
                git([url: 'https://github.com/yeonju109/kubernetes-with-Istio.git', branch: 'main', credentialsId: 'github'])
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

        //            dir('front-shop'){
        //                docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
          //              def front_image = docker.build("${ECR_PATH}/${FRONT_IMAGE}")
            //            front_image.push("v${env.BUILD_NUMBER}")
            //            }
            //        }

        //             dir('account'){
        //                 docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
        //                 def user_image = docker.build("${ECR_PATH}/${USER_IMAGE}")
        //                 user_image.push("v${env.BUILD_NUMBER}")
        //                 }
        //             }

        //             dir('order'){
        //                 docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
        //                 def order_image = docker.build("${ECR_PATH}/${ORDER_IMAGE}")
        //                 order_image.push("v${env.BUILD_NUMBER}")
        //                 }
        //             }

        //             dir('cart'){
        //                 docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
        //                 def cart_image = docker.build("${ECR_PATH}/${CART_IMAGE}")
        //                 cart_image.push("v${env.BUILD_NUMBER}")
        //                 }
        //             }

        //             dir('rating'){
        //                 docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_ID}"){
        //                 def rating_image = docker.build("${ECR_PATH}/${RATING_IMAGE}")
        //                 rating_image.push("v${env.BUILD_NUMBER}")
        //                 }
        //             }
                }
            }
        }
         stage('CleanUp Images'){
             steps{
                   sh""" 
                   docker rmi ${ECR_PATH}/${PRODUCT_IMAGE}:v$BUILD_NUMBER
                   docker rmi ${ECR_PATH}/${PRODUCT_IMAGE}:latest
                   """
        //         sh"""
        //         docker rmi ${ECR_PATH}/${PRODUCT_IMAGE}:v$BUILD_NUMBER
        //         docker rmi ${ECR_PATH}/${PRODUCT_IMAGE}:latest
        //         docker rmi ${ECR_PATH}/${FRONT_IMAGE}:v$BUILD_NUMBER
        //         docker rmi ${ECR_PATH}/${FRONT_IMAGE}:latest
        //         docker rmi ${ECR_PATH}/${USER_IMAGE}:v$BUILD_NUMBER
        //         docker rmi ${ECR_PATH}/${USER_IMAGE}:latest
        //         docker rmi ${ECR_PATH}/${ORDER_IMAGE}:v$BUILD_NUMBER
        //         docker rmi ${ECR_PATH}/${ORDER_IMAGE}:latest
        //         docker rmi ${ECR_PATH}/${CART_IMAGE}:v$BUILD_NUMBER
        //         docker rmi ${ECR_PATH}/${CART_IMAGE}:latest
        //         docker rmi ${ECR_PATH}/${RATING_IMAGE}:v$BUILD_NUMBER
        //         docker rmi ${ECR_PATH}/${RATING_IMAGE}:latest
        //         """
             }
         }
        stage("update manifest"){
            steps{
            git credentialsId: 'github-ssh',
                url: 'git@github.com:yeonju109/kubernetes_with_Istio_Helm.git',
                branch: 'main'
            sh "git config --global user.email ${GIT_EMAIL}"
            sh "git config --global user.name ${GIT_USERNAME}"
            dir('PRD/version'){
           
            echo "update yamls"
            sh "sed 's/${TAG}/${TAG}4/' value_init.yaml > value_v4.yaml" 
            sh 'rm ../values.yaml'
            sh "cp value_v4.yaml ../values.yaml"
	    sh 'git add . '
            sh 'git commit -m "commit manifest${BUILD_NUMBER}"'
            sh 'git push origin master'
            }
            }         
        }
    }
}
