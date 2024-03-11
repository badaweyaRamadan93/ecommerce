import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
function ResetPassword() {
    let navg = useNavigate();
    let [loader, setLoaderState] = useState(true);
    let [errMess, setErrMess] = useState("");

    let validationSchema = Yup.object({
        email: Yup.string()
            .email("Email is Invalid")
            .required("Email is required"),

        newPassword: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                "At least 8 characters long, Contains at least one uppercase letter And, Contains at least one lowercase letter."
            )
            .required("password is required"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema,
        onSubmit: resetPassword,
    });
    async function resetPassword(val) {
        setLoaderState(false);
        let req = await axios
            .put(
                "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                val
            )
            .catch((err) => {
                setErrMess(err.response.data.message);
                setLoaderState(true);
            });
        if (req.status === 200) {
            setLoaderState(true);
            navg("/login");
        }
    }
    return (
        <div>
            (
            <div className="container py-5">
                <h2>Reset Password Now!</h2>
                {errMess && (
                    <div className="alert alert-danger mt-3">{errMess}</div>
                )}

                <form onSubmit={formik.handleSubmit} className="py-2">
                    <div className="mb-3">
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control mt-1"
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <div className="alert alert-danger">
                                {formik.errors.email}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword">New Password :</label>
                        <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control mt-1"
                        />
                        {formik.errors.newPassword &&
                        formik.touched.newPassword ? (
                            <div className="alert text-capitalize alert-danger">
                                {formik.errors.newPassword}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    {loader ? (
                        <button
                            type="submit"
                            className="btn bg-main text-white"
                            disabled={!(formik.isValid && formik.dirty)}
                        >
                            Login
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
            );
        </div>
    );
}

export default ResetPassword;
