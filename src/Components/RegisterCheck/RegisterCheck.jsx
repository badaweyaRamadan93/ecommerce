import React from "react";
import styles from "./RegisterCheck.module.css";
import { Navigate } from "react-router-dom";
import Register from "../Register/Register";
export default function RegisterCheck() {
    if (localStorage.getItem("userToken")) {
        return <Navigate to={"/home"} />;
    } else {
        return <Register />;
    }
}
