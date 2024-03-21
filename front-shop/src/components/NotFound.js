import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="justify-content-center">
                    <div className="p-5 col-lg-12 text-center">
                        <h1 className="text-center display-1 m-3">404</h1>
                        <h6 className="display-6 m-3">
                            여기는 어디... 난 누구...
                        </h6>

                        <Link to="/" className="btn btn-light m-3">홈페이지로 돌아가기</Link>

                        <br/>

                        <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="404" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
