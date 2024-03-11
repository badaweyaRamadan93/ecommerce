import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { wishContext } from "../../Context/WhisListContext";

export default function Product({ product }) {
    let { addWish, setWishCounter, wishColorList, setWishColorList } =
        useContext(wishContext);
    let { addCart, setCartCounter } = useContext(CartContext);

    useEffect(() => {
        const storedWishColorList = JSON.parse(
            localStorage.getItem("wishColorList")
        );
        if (storedWishColorList) {
            setWishColorList(storedWishColorList);
        } else {
            setWishColorList([]);
        }
    }, []);

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

    async function addToWishList(e, productId) {
        changeColor(e, productId);
        let { data } = await addWish(e, productId);
        if (data.status === "success") {
            setWishCounter(data.data.length);
            toast.success(data.message, {
                style: {
                    boxShadow: "none",
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    maxWidth: "400px",
                },
                position: "top-left",
            });
        }
    }

    function changeColor(e, productId) {
        const updatedWishColorList = [...wishColorList];
        if (!updatedWishColorList.includes(productId)) {
            updatedWishColorList.push(productId);
        }
        setWishColorList(updatedWishColorList);
        localStorage.setItem(
            "wishColorList",
            JSON.stringify(updatedWishColorList)
        );
    }
    return (
        <>
            <div className="col-md-4 col-lg-3 col-xl-3 cursor-pointer">
                <div className="product p-2 rounded-3 text-capitalize">
                    <Toaster />
                    <Link to={`/product/` + product._id}>
                        <img
                            src={product.imageCover}
                            className="w-100"
                            alt=""
                        />
                        <h6 className="text-main fw-bold mt-2">
                            {product.category.name}
                        </h6>
                        <h5>
                            {product.title.split(" ").slice(0, 2).join(" ")}
                        </h5>
                        <div className="d-flex justify-content-between">
                            <span>{product.price} EGP</span>
                            <span>
                                <i className="fa-solid fa-star rating-color"></i>
                                {product.ratingsAverage}
                            </span>
                        </div>
                    </Link>

                    <div className="row">
                        <div className="col-10">
                            <button
                                onClick={() => addToCart(product._id)}
                                className="btn mt-2 bg-main text-white d-block w-100"
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div
                            onClick={(e) => addToWishList(e, product._id)}
                            className="col-2 p-0 d-flex align-items-center justify-content-center"
                        >
                            <i
                                className="fa-solid m-0 pe-md-3 align-items-center h3 fa-heart"
                                style={{
                                    color: wishColorList?.includes(product._id)
                                        ? "red"
                                        : "",
                                }}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
