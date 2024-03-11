import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import favicon from "../../Assets/images/online-store.png";

export default function ProductDetails() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
        ],
    };
    let proID = useParams();
    let [productId, setProductId] = useState("");
    let { addCart, setCartCounter } = useContext(CartContext);
    async function getProductDetails(queryData) {
        return await axios.get(
            `https://ecommerce.routemisr.com/api/v1/products/${queryData.queryKey[1]}`
        );
    }

    async function addToCart(id) {
        let response = await addCart(id);
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                style: {
                    boxShadow: "none",
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    maxWidth: "385px",
                },
                position: "top-left",
            });
            setCartCounter(response.data.numOfCartItems);
        }
    }

    useEffect(() => {
        setProductId(proID.id);
    }, []);

    let { isLoading, data } = useQuery(
        ["product", productId],
        getProductDetails
    );
    let product = data?.data.data;
    return (
        <>
            <Toaster />
            {isLoading && <Loader />}
            {product ? (
                <div className="container py-5">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>
                            {`Fresh Cart - ${
                                product ? product.title : "Product Details"
                            }`}
                        </title>
                        <link
                            rel="shortcut icon"
                            href={favicon}
                            type="image/x-icon"
                        />
                    </Helmet>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-3 mb-4">
                            <Slider {...settings}>
                                {product?.images?.map((el) => {
                                    return (
                                        <div className="item slide" key={el}>
                                            <img
                                                className="w-100"
                                                src={el}
                                                alt=""
                                            />
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                        <div className="col-md-8 text-capitalize flex-column d-flex gap-2">
                            <h3 className="fw-bold m-0">{product.title}</h3>
                            <p className="text-muted">{product.description}</p>
                            <span>{product.category?.name}</span>
                            <div className="d-flex justify-content-between">
                                <span className="text-main fw-bold">
                                    {product.price} EGP
                                </span>
                                <span>
                                    <i className="fa-solid fa-star rating-color me-1"></i>
                                    {product.ratingsAverage}
                                </span>
                            </div>
                            <button
                                onClick={() => addToCart(product._id)}
                                className="btn bg-main text-white mt-3"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-danger m-5 py-5">
                    No Product Found
                </div>
            )}
        </>
    );
}
