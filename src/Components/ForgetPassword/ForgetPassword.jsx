import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    let [loader, setLoaderState] = useState(true);
    let [errMess, setErrMess] = useState("");
    let navg = useNavigate();

    let validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("emial is a must"),
    });
    let formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: sendData,
    });
    async function sendData(val) {
        setLoaderState(false);
        let req = await axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                val
            )
            .catch((err) => {
                setLoaderState(true);
                setErrMess(err.response.data.message);
            });
        if (req.data.statusMsg === "success") {
            setLoaderState(true);
            navg("/verifyCode");
        }
    }
    return (
        <>
            <div className="container py-5">
                <h2>Forget Password?</h2>
                {errMess ? (
                    <div className="alert alert-danger my-4">{errMess}</div>
                ) : (
                    ""
                )}
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="mt-1 mb-3 form-control"
                        name="email"
                        id="email"
                    />
                    {formik.errors.email ? (
                        <div className="alert alert-danger">
                            {formik.errors.email}
                        </div>
                    ) : (
                        ""
                    )}
                    {loader ? (
                        <button
                            type="submit"
                            className="btn bg-main text-white"
                            disabled={!(formik.isValid && formik.dirty)}
                        >
                            Send Code!
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn bg-main text-white"
                        >
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        </button>
                    )}
                </form>
            </div>
        </>
    );
}
