import React, { useContext, useEffect, useState } from "react";
import { wishContext } from "../../Context/WhisListContext";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function WishList() {
    let { getWish, removeWish, setWishCounter, setWishColorList } =
        useContext(wishContext);
    let { addCart, setCartCounter } = useContext(CartContext);
    let [data, setData] = useState(null);

    useEffect(() => {
        getWishList();
    }, []);

    async function getWishList() {
        let { data } = await getWish().catch((err) => err);
        setData(data);
        setWishCounter(data.data.length);
    }

    async function removeWishItem(id) {
        let { data } = await removeWish(id);
        if (data.status === "success") {
            setWishCounter(data.data.length);
            toast.error("Item Is Removed", {
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
        const updatedWishColorList = data.data;
        setWishColorList(updatedWishColorList);
        localStorage.setItem(
            "wishColorList",
            JSON.stringify(updatedWishColorList)
        );
        getWishList();
    }

    async function addToCart(id) {
        let response = await addCart(id);
        if (response.data.status === "success") {
            setWishCounter(data.data.length);
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

    return (
        <div className="container my-5 p-5 cart rounded-3">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart - Wish List</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Toaster />
            <h2 className="text-black my-t  fw-bolder rounded-2 p-3 text-center">
                {data?.data.length > 0 ? (
                    <p className="bg-body-secondary py-4 rounded-3">
                        {" "}
                        Whish List Items : {data?.data?.length}
                    </p>
                ) : (
                    <p className="py-5 my-5 text-main">
                        Your Whish List Is Empty
                    </p>
                )}
            </h2>

            <div className="row m-0 p-0 g-0 g-lg-3">
                {data
                    ? data.data.map((product) => {
                          return (
                              <div
                                  className="row col-xl-6 py-3 my-4 g-0 gx-md-4 flex-row"
                                  key={product._id}
                              >
                                  <div className="col-md-3">
                                      <img
                                          className="w-100"
                                          src={product.imageCover}
                                          alt=""
                                      />
                                  </div>
                                  <div className="col-md-9 g-0 g-xl-3 row">
                                      <div className="col-md-10 d-flex flex-column justify-content-between left">
                                          <div className="top">
                                              <h3 className="mt-md-0 mt-3 fw-bold">
                                                  {product.title
                                                      .split(" ")
                                                      .slice(0, 3)
                                                      .join(" ")}
                                              </h3>
                                              <h6 className="text-main fw-bold">
                                                  {product.category.name}
                                              </h6>
                                              <p className="muted">
                                                  {product.description
                                                      .split(" ")
                                                      .slice(0, 10)
                                                      .join(" ")}
                                              </p>
                                          </div>
                                          <div className="bottom">
                                              <div
                                                  className="del mb-2 cursor-pointer"
                                                  onClick={() =>
                                                      removeWishItem(product.id)
                                                  }
                                              >
                                                  <i className="fa-solid text-danger h5 fa-trash"></i>
                                                  <span className="mx-1 fw-bolder h5 text-danger ">
                                                      Remove Item
                                                  </span>
                                              </div>
                                              <h4 className="text-main fw-bolder">
                                                  Price : {product.price} EGP
                                              </h4>
                                              <h4 className="text-capitalize h5 fw-bold">
                                                  rating :{" "}
                                                  {product.ratingsAverage}
                                                  <i className="fa-solid fa-star rating-color mx-2"></i>
                                              </h4>
                                          </div>
                                      </div>
                                      <div className="col-md-2 right d-flex justify-content-end align-items-end">
                                          <button
                                              onClick={() =>
                                                  addToCart(product.id)
                                              }
                                              className="bg-main mt-3 mt-xl-0 d-flex align-items-center justify-content-center w-100 text-white btn px-4 py-2"
                                          >
                                              <i className="fa-solid fa-cart-plus h4 m-0 mt-1"></i>
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : ""}
            </div>
        </div>
    );
}
