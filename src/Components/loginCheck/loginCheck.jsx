import React from "react";
import { Navigate } from "react-router-dom";

export default function LoginCheck(props) {
    if (localStorage.getItem("userToken")) {
        return <Navigate to={"/"} />;
    } else {
        return props.children;
    }
}
