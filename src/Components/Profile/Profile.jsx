import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserCotext";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function Profile() {
    let { userData } = useContext(UserContext);
    let [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        async function getUserOrders() {
            if (userData) {
                let data = await axios.get(
                    `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`
                );
                setUserOrders(data.data);
            }
        }
        getUserOrders();
    }, [userData]);
    return (
        <>
            {userOrders ? (
                <div className="container  p-md-5  mt-5 rounded-3">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Fresh Cart - Profile</title>
                        <link
                            rel="canonical"
                            href="http://mysite.com/example"
                        />
                    </Helmet>
                    <h2 className="text-capitalize">
                        Welcome, {userData?.name}
                    </h2>
                    {userOrders[0]?.user?.email ? (
                        <h4 className="text-muted ">
                            Your Email: {userOrders[0].user.email}{" "}
                        </h4>
                    ) : (
                        ""
                    )}
                    {userOrders[0]?.user?.phone ? (
                        <h4 className="text-muted ">
                            Your Phone: {userOrders[0].user.phone}{" "}
                        </h4>
                    ) : (
                        ""
                    )}
                    {userOrders[0] ? (
                        <main className="rounded-3 d-flex flex-column-reverse">
                            {userOrders.map((order) => {
                                return (
                                    <div
                                        key={order._id}
                                        className="products-container bg-body-secondary mt-4 py-md-5 py-3 px-md-5 px-3 rounded-3"
                                    >
                                        <div className="order-details row">
                                            <div className="col-md-6">
                                                <h4 className="text-main fw-bolder">
                                                    Order Price:{" "}
                                                    {order.totalOrderPrice}
                                                </h4>
                                                <h5 className="text-muted fw-bold">
                                                    Order Id: {order.id}
                                                </h5>
                                                <h5 className="text-muted mt-3 mb-0 fw-bold">
                                                    Order Details:
                                                </h5>
                                                <p className="text-muted fw-bold m-0">
                                                    {" "}
                                                    Phone:{" "}
                                                    {
                                                        order.shippingAddress
                                                            .phone
                                                    }{" "}
                                                </p>
                                                <p className="text-muted fw-bold m-0">
                                                    {order.shippingAddress.city}
                                                    ,{"  "}
                                                    {
                                                        order.shippingAddress
                                                            .details
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-6">
                                                <p className="text-muted text-capitalize fw-bold mt-1 m-0">
                                                    {" "}
                                                    Payment Method Type:{" "}
                                                    {
                                                        order.paymentMethodType
                                                    }{" "}
                                                </p>
                                                <p className="text-muted fw-bold m-0 mt-1">
                                                    Order Statuse:
                                                    {order.isDelivered === true
                                                        ? " Delivered"
                                                        : " On It's Way"}
                                                </p>
                                                <p className="text-muted fw-bold m-0 mt-1">
                                                    Order Statuse:
                                                    {order.isPaid === true
                                                        ? " Paid"
                                                        : " Not Paid"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="order row g-3 mt-1">
                                            {order.cartItems.map((item) => {
                                                return (
                                                    <div
                                                        className="col-md-4"
                                                        key={item._id}
                                                    >
                                                        <Link
                                                            to={
                                                                `/product/` +
                                                                item.product.id
                                                            }
                                                        >
                                                            <div className="bg-white p-4 rounded-3">
                                                                <h5 className="text-muted fw-bold">
                                                                    Quantity:{" "}
                                                                    {item.count}
                                                                </h5>
                                                                <h5 className="text-muted fw-bold">
                                                                    Price:{" "}
                                                                    {item.price}
                                                                </h5>
                                                                <h6 className="text-main fw-bolder">
                                                                    {item.product.title
                                                                        .split(
                                                                            " "
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            3
                                                                        )
                                                                        .join(
                                                                            " "
                                                                        )}
                                                                </h6>
                                                                <img
                                                                    className="w-100"
                                                                    src={
                                                                        item
                                                                            .product
                                                                            .imageCover
                                                                    }
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </main>
                    ) : (
                        <main className="py-5 my-5">
                            <p className="alert fw-bolder text-center h3 text-capitalize alert-secondary py-5">
                                Ther Are no Details Yet
                            </p>
                        </main>
                    )}
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
}
