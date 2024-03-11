import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { UserContext } from "../../Context/UserCotext";
import { CartContext } from "../../Context/CartContext";
import { wishContext } from "../../Context/WhisListContext";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";

export default function Layout() {
    let { setUserToken, userData } = useContext(UserContext);
    let { getCart, setCartCounter } = useContext(CartContext);
    let { getWish, setWishCounter, setWishColorList, wishColorList } =
        useContext(wishContext);

    async function getData() {
        let response = await getCart().catch((err) => err);
        if (response?.data?.status === "success") {
            setCartCounter(response.data.numOfCartItems);
        }
    }

    async function getWishList() {
        let { data } = await getWish().catch((err) => err);
        setWishCounter(data.data.length);
        setWishColorList(data?.data?.map((item) => item.id));
    }

    useEffect(() => {
        if (localStorage.getItem("userToken") !== null) {
            setUserToken(localStorage.getItem("userToken"));
            getData();
            getWishList();
        }
    }, [userData]);


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Navbar />
            <div className=" pt-5 layout">
                <Outlet></Outlet>
            </div>
            <Footer />
        </>
    );
}
