import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyCode() {
    let [loader, setLoaderState] = useState(true);
    let [errMess, setErrMess] = useState("");
    let navg = useNavigate();
    let validationSchema = Yup.object({
        resetCode: Yup.string()
            .required()
            .matches(/^[0-9]{3,6}$/, "Enter A Valid Code"),
    });
    let formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema,
        onSubmit: sendCode,
    });
    async function sendCode(val) {
        setLoaderState(false);
        let req = await axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                val
            )
            .catch((err) => {
                console.log(err);
                setLoaderState(true);
                setErrMess(err.response.data.message);
            });
        if (req.data.status === "Success") {
            setLoaderState(true);
            navg("/resetpassword");
        }
    }
    return (
        <div className="container py-5">
            <h1>Enter Security Code!</h1>
            {errMess ? (
                <div className="alert alert-danger my-4">{errMess}</div>
            ) : (
                ""
            )}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="code">Code :</label>
                <input
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="mt-1 mb-3 form-control"
                    name="resetCode"
                    id="code"
                />
                {formik.errors.resetCode && formik.touched.resetCode ? (
                    <div className="alert alert-danger">
                        {formik.errors.resetCode}
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
                        Verify
                    </button>
                ) : (
                    <button type="button" className="btn bg-main text-white">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </button>
                )}
            </form>
        </div>
    );
}
