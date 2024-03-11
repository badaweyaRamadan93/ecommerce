import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <div className=" bg-body-tertiary py-5">
            <div className="container py-5 ">
                <h2>Get Fresh Cart App</h2>
                <p className="muted" style={{ fontSize: "15px" }}>
                    We will send you a link, open it on your phone to download
                    the app.
                </p>
                <div className="row">
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type Your Email"
                        />
                    </div>
                    <div className="col-md-3">
                        <button className="btn bg-main w-100 mt-3 m-md-0 text-white">
                            Get App Now!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
