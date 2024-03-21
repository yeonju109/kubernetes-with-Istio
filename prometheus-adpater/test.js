import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '60s', target: 10 },
    { duration: '60s', target: 1 },
  ]
};

export default function () {

  //user, rating test

  console.log("--------------------------------------------------------");
  console.log("user create and delete playbook");
  console.log("create user");
  
  const username = Math.random().toString(36).substring(2, 10);
  const data = {
    username: username,
    password: "1234",
    email: "abcd@abcd.com",
    phone_number: "01011111111"
  };
  
  const createUserUrl = "http://10.101.159.42/apis/v1/user";
  const createUserHeaders = { 'Content-Type': 'application/json' };
  const createUserResponse = http.post(createUserUrl, JSON.stringify(data), { headers: createUserHeaders });
  const user_id = createUserResponse.json().payload.user_id;
  
  if (!username) {
    console.log("Error: username doesn't exist");
    return;
  }
  sleep(1);
  http.get("http://10.101.159.42/apis/v1/ratings/" + user_id);
  sleep(1);
  console.log("\ndelete user");
  
  const deleteUserUrl = "http://10.101.159.42/apis/v1/user/" + user_id;
  const deleteUserHeaders = { 'Content-Type': 'application/json' };
  http.del(deleteUserUrl, null, { headers: deleteUserHeaders });
  
  sleep(0.5);

  

  ///////////////////////////////////////////////////////////////////////////////////////

  // load test + hpa test + canary test  + circuit-breaking test

  // console.log("load test + product circuit breaking test + canry test")

  let urls = [
    "http://10.101.159.42/apis/v1/product/1", //상품목록
    "http://10.101.159.42/apis/v1/user/1", // user
    "http://10.101.159.42/apis/v1/ratings/1", // rating (매너온도)
    "http://10.101.159.42/apis/v1/carts/users/1", // 찜목록
    "http://10.101.159.42/apis/v1/order/1", // 주문목록
    "http://10.101.159.42/apis/v1/order/sale/1", // 판매목록
  ];
  let randomIndex = Math.floor(Math.random() * urls.length);
  let url = urls[randomIndex];
  http.get(url);

  sleep(0.5);


}