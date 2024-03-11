import React from "react";
import styles from "./Loader.module.css";

export default function Loader() {
    return (
        <>
            (
            <div className="loading d-flex align-items-center justify-content-center bg-black position-fixed top-0 end-0 bottom-0 start-0 ">
                <span className="loader"></span>
            </div>
            )
        </>
    );
}
