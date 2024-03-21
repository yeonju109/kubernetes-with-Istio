import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
const Move = () => {
    return (
        <div
            style={{
                background: "#a97bf5"
            }}
        >
            <hr />
            <br />
            <Container>
                <br />
                <ul>
                    <li>
                        <a href="https://www.notion.so/MSA-Shop-with-Istio-k8s-gateway-31cf9b0d75bd47a7ad6d1fcec4dc75cd?pvs=4" style={{ color: 'white', fontWeight: 'bold' }}>
                            https://www.notion.so/MSA-Shop-with-Istio-k8s-gateway-31cf9b0d75bd47a7ad6d1fcec4dc75cd?pvs=4
                        </a>
                    </li>
                    <li>
                        <a href="https://seungjuitmemo.tistory.com/" style={{ color: 'white', fontWeight: 'bold' }}>
                            https://github.com/sooeonzzang
                        </a>
                    </li>
                    <br />
                    <br />

                    {/* <li><Link to="http://naver.com" style={{textDecoration:'none', color:'inherit'}}>Home</Link></li>
                <li><Link to="/login" style={{textDecoration:'none', color:'inherit'}}>Login</Link></li>
                <li><Link to="/logout"style={{textDecoration:'none', color:'inherit'}}>Logout</Link></li>
                <li><Link to="/register"style={{textDecoration:'none', color:'inherit'}}>Register</Link></li>
                <li><Link to="/product/register"style={{textDecoration:'none', color:'inherit'}}>ProductRegister</Link></li>
                <li><Link to="/category/1"style={{textDecoration:'none', color:'inherit'}}>ProductByCategory</Link></li>
                <li><Link to="/orderlist"style={{textDecoration:'none', color:'inherit'}}>OrderList</Link></li> */}
                </ul>
            </Container>
        </div>
    );
};

export default Move;
