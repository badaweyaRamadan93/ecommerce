import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserCotext";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import WishList from "../wishList/wishList";
import { wishContext } from "../../Context/WhisListContext";

export default function Navbar() {
    let navg = useNavigate();
    let { userData } = useContext(UserContext);
    let { userToken, setUserToken } = useContext(UserContext);
    let { cartCounter } = useContext(CartContext);
    let { wishCounter } = useContext(wishContext);

    function LogOut() {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0aad0a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log Out",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("userToken");
                setUserToken(null);
                navg("/login");
            }
        });
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="fresh cart logo" />
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        {userToken !== null ? (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/home">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/products"
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/categories"
                                    >
                                        Categories
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/brands">
                                        Brands
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/allorders"
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                            </ul>
                        ) : (
                            ""
                        )}

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {userToken !== null ? (
                                <>
                                    <li className="nav-item d-flex align-items-center">
                                        <Link
                                            to={"/wishList"}
                                            className="d-flex align-items-center"
                                        >
                                            <i className="cart-icon fa-solid align-items-center mb-lg-0 mb-3 mx-2 h5 fa-heart">
                                                <p className="cart-num">
                                                    {wishCounter}{" "}
                                                </p>
                                            </i>
                                        </Link>
                                    </li>
                                    <li className="nav-item d-flex align-items-center">
                                        <Link
                                            to={"/cart"}
                                            className="d-flex align-items-center"
                                        >
                                            <i className="cart-icon fa-solid fa-cart-shopping h5 m-0 mx-2 cursor-pointer">
                                                <p className="cart-num">
                                                    {cartCounter ? cartCounter : 0}{" "}
                                                </p>
                                            </i>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                ""
                            )}

                            {userToken !== null ? (
                                <li className="nav-item">
                                    <span
                                        className="nav-link cursor-pointer"
                                        onClick={() => LogOut()}
                                    >
                                        Logout
                                    </span>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to="/login"
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/">
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
