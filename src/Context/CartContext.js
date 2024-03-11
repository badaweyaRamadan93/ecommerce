import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
    let [cartCounter, setCartCounter] = useState(null);

    function addCart(id) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        };
        let data = {
            productId: id,
        };
        return axios.post(
            `https://ecommerce.routemisr.com/api/v1/cart`,
            data,
            options
        );
    }

    function getCart() {
        let headers = {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        };
        return axios
            .get(`https://ecommerce.routemisr.com/api/v1/cart`, headers)
            .catch((err) => err);
    }

    function removeItem(id) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        };
        return axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            options
        );
    }
    function updateItem(id, count) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        };
        let body = {
            count,
        };
        return axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            body,
            options
        );
    }

    function checkOut(cartID, shippingAddress) {
        return axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
                { shippingAddress },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            )
            .catch((err) => err);
    }

    function checkOutVisa(cartID, shippingAddress) {
        return axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000`,
                { shippingAddress },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            )
            .catch((err) => err);
    }

    return (
        <CartContext.Provider
            value={{
                addCart,
                getCart,
                removeItem,
                updateItem,
                checkOut,
                checkOutVisa,
                cartCounter,
                setCartCounter,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
