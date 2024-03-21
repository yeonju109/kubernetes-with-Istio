import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../modules/category";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { Container, Navbar, Spinner } from "react-bootstrap";
import Loading from "./Loading";
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';

export default function Home(props) {
    const [products, Setproducts] = useState([]);

    const dispatch = useDispatch();
    const fetchProducts = async () => {
        let res = await axios.get("/apis/v1/product");
        let product_list = res.data.payload.filter((p) => p.valid === true);
        product_list = product_list.map((data) => {
            return {
                ...data,
                id: data.pk,
            };
        });
        Setproducts(product_list);
    };

    const fetchCategory = async () => {
        let res = await axios.get("/apis/v1/category");

        let category_list = res.data.map((data) => {
            return {
                kind: data.fields.kind,
                pk: data.pk,
            };
        });
        dispatch(setCategory(category_list));
    };

    useEffect(() => {
        fetchProducts();
        fetchCategory();
    }, []);

    return (
        <div>
            <div>
                <ControlledCarousel />

                <br />
                <Container>
                    <div style={{ marginTop: 30 }} />
                    <h3>오늘의 상품 추천</h3>

                    <hr />
                    <Loading products={products} />
                </Container>
            </div>
        </div>
    );
}

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect} fade>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                    style={{
                        minWidth: "100%",
                        height: "30rem",
                    }}
                />
                <Carousel.Caption>
                    {/* <h3>First slide label</h3>
                    <p>First slide label ~~~~</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img2}
                    alt="Second slide"
                    style={{
                        minWidth: "100%",
                        height: "30rem",
                    }}
                />

                <Carousel.Caption>
                    {/* <h3>Second slide label</h3>
                    <p>아무거나 적어 </p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                    style={{
                        minWidth: "100%",
                        height: "30rem",
                    }}
                />
                <Carousel.Caption>
                    {/* <h3>Third slide label</h3>
                    <p>
                    세번째
                    </p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
