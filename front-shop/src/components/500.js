import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const InternalServerErrorPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="justify-content-center">
                    <div className="p-5 col-lg-12 text-center">
                        <h1 className="text-center display-1 m-3">500</h1>
                        <h6 className="display-6 m-3">
                            이게... 연결 안되네 ㅠㅠ
                        </h6>

                        <Link to="/" className="btn btn-light m-3">홈페이지로 돌아가기</Link>

                        <br/>

                        <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="500" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternalServerErrorPage;
