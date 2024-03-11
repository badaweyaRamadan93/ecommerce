import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
    let { getCart, removeItem, updateItem, setCartCounter } =
        useContext(CartContext);
    let [isLoading, setIsLoading] = useState(false);
    let [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let response = await getCart().catch((err) => err);
        if (response?.data?.status === "success") {
            setData(response.data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    async function removeSpecificItem(id) {
        let response = await removeItem(id).catch((err) => err);

        if (response.data.status === "success") {
            toast.error("Item Is Removed", {
                style: {
                    boxShadow: "none",
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    maxWidth: "385px",
                },
                position: "top-left",
            });
            setData(response.data);
            setIsLoading(false);
            setCartCounter(response.data.numOfCartItems);
        }
    }
    async function clearCart() {
        let headers = {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        };

        let response = await axios
            .delete(`https://ecommerce.routemisr.com/api/v1/cart`, headers)
            .catch((err) => err);
        if (response.data.message === "success") {
            toast.success("Cart Is Cleared", {
                style: {
                    boxShadow: "none",
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    maxWidth: "385px",
                },
                position: "top-left",
            });
            setData(response.data);
            setIsLoading(false);
        }
        setData(null);
        setCartCounter(0);
    }

    async function updateSpecificItem(id, count) {
        let response = await updateItem(id, count).catch((err) => err);
        if (response.data.status === "success") {
            toast.success("Item Is Updated", {
                style: {
                    boxShadow: "none",
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    maxWidth: "385px",
                },
                position: "top-left",
            });
            setData(response.data);
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="container rounded-3 p-5 my-5 cart">
                    <Toaster />
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Fresh Cart - Cart</title>
                        <link
                            rel="canonical"
                            href="http://mysite.com/example"
                        />
                    </Helmet>
                    <h2 className="text-black  py-5 my-5 fw-bolder rounded-2 p-3 text-center">
                        {data?.data?.products?.length ? (
                            <p className="bg-body-secondary py-4 rounded-3">
                                Cart Items : {data?.data?.products?.length}
                            </p>
                        ) : (
                            <p className="my-5 text-main">Your Cart Is Empty</p>
                        )}
                    </h2>
                    <div className="my-4">
                        {data?.data?.products?.map((product, index) => {
                            return (
                                <div key={index} className="row g-4 my-5">
                                    <div className="col-md-3 img">
                                        <img
                                            src={product.product.imageCover}
                                            alt=""
                                            className="w-100"
                                        />
                                    </div>
                                    <div className="col-md-9 pt-3 row data">
                                        <div className="left col-md-8 d-flex justify-content-between flex-column">
                                            <div className="top">
                                                <Link
                                                    className="fit d-block"
                                                    to={`/product/${product.product.id}`}
                                                >
                                                    <h2 className="fw-bolder fit">
                                                        {product.product.title
                                                            .split(" ")
                                                            .slice(0, 3)
                                                            .join(" ")}
                                                    </h2>
                                                </Link>
                                                <h5 className="text-main fw-bolder">
                                                    {
                                                        product.product.category
                                                            .name
                                                    }
                                                </h5>
                                            </div>
                                            <div className="text-main text-capitalize bottom">
                                                <div
                                                    className="del mb-2 cursor-pointer"
                                                    onClick={() =>
                                                        removeSpecificItem(
                                                            product.product.id
                                                        )
                                                    }
                                                >
                                                    <i className="fa-solid text-danger h5 fa-trash"></i>
                                                    <span className="mx-1 fw-bolder h5 text-danger ">
                                                        Remove Item
                                                    </span>
                                                </div>
                                                <h4 className="fw-bolder">
                                                    Price : {product.price} EGP
                                                </h4>
                                                <h4 className="text-black h5 fw-bold">
                                                    rating :{" "}
                                                    {
                                                        product.product
                                                            .ratingsAverage
                                                    }
                                                    <i className="fa-solid fa-star rating-color mx-2"></i>
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="right col-md-4 d-flex align-items-center justify-content-end">
                                            <button
                                                disabled={product.count <= 1}
                                                onClick={() => {
                                                    updateSpecificItem(
                                                        product.product.id,
                                                        --product.count
                                                    );
                                                }}
                                                className="btn btn-danger text-white"
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">
                                                {product?.count}
                                            </span>
                                            <button
                                                onClick={() => {
                                                    updateSpecificItem(
                                                        product.product.id,
                                                        ++product.count
                                                    );
                                                }}
                                                className="btn btn-success text-white"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="d-flex py-3 gy-3 row justify-content-between">
                        {data?.data?.products?.length ? (
                            <>
                                <h4 className="col-md-6 text-main fw-bolder bg-body-secondary m-0 rounded-2 fit p-3  d-flex align-items-center text-capitalize">
                                    Total Price : {data?.data?.totalCartPrice}
                                </h4>
                                <div className="btns ps-0 justify-content-start justify-content-md-end d-flex col-md-6">
                                    <button
                                        onClick={clearCart}
                                        className="btn btn-outline-danger px-4 py-3 fw-bolder"
                                    >
                                        Clear Cart
                                    </button>
                                    <Link
                                        to={`/address/${data?.data?._id}`}
                                        className="btn ms-2 bg-main text-white px-4 py-3 fw-bolder"
                                    >
                                        Check Out
                                    </Link>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
