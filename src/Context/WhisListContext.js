import axios from "axios";
import React, { createContext, useState } from "react";

export let wishContext = createContext();
export default function WhisListContextProvider({ children }) {
    let [wishCounter, setWishCounter] = useState(null);
    let [wishColorList, setWishColorList] = useState([]);
    

    function addWish(e, productId) {
        let body = {
            productId,
        };
        let options = {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        };
        return axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                body,
                options
            )
            .catch((err) => err);
    }
    function getWish() {
        let options = {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        };
        return axios(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            options
        );
    }
    function removeWish(id) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        };
        return axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            options
        );
    }
    return (
        <wishContext.Provider
            value={{
                addWish,
                getWish,
                removeWish,
                wishCounter,
                setWishCounter,
                wishColorList,
                setWishColorList,
            }}
        >
            {children}
        </wishContext.Provider>
    );
}
