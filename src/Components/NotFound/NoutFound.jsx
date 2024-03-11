import React from "react";
import { Link } from "react-router-dom";
import errImg from "../../Assets/images/error.svg";

export default function NoutFound() {
    return (
        <div className="container py-5 align-items-center justify-content-center h-100 d-flex flex-column">
            <div className="fa-2x">
            <h2>Not Found!!!</h2>
                Redirect{" "}
                <Link style={{textDecoration:"underLine"}} to={"/"}>
                    !Here
                </Link>
                <img
                    src={errImg}
                    className="w-100 d-block mt-5"
                    alt=""
                />
            </div>
        </div>
    );
}
