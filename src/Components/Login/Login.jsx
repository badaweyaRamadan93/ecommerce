import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserCotext";
import { Helmet } from "react-helmet";

export default function Register() {
    const navg = useNavigate();
    let [errMes, setErr] = useState("");
    let [sucMes, setSuc] = useState("");
    let [lodaing, setLoading] = useState(true);
    let { setUserToken } = useContext(UserContext);

    let validationSchema = Yup.object({
        email: Yup.string()
            .email("Email is Invalid")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    let formik = useFormik({
        //intial values
        initialValues: {
            email: "",
            password: "",
        },
        //validate
        validationSchema,
        // function
        onSubmit: sendData,
    });

    // Send The data to Database
    async function sendData(values) {
        setLoading(false);
        let req = await axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            .catch((err) => {
                setErr(err.response.data.message);
                setSuc("");
                setLoading(true);
            });
        if (req.data.message === "success") {
            setSuc(req.data.message);
            setUserToken(req.data.token);
            setLoading(true);
            localStorage.setItem("userToken", req.data.token);
            navg("/home");
        }
    }
    // ############################################
    // ############################################
    // ############################################
    return (
        <>
            <div className="container my-5 py-5">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Fresh Cart</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <h2>Login Now!</h2>
                {errMes && !sucMes ? (
                    <div className="text-capitalize alert alert-danger">
                        {errMes}
                    </div>
                ) : (
                    ""
                )}

                {sucMes ? (
                    <div className="text-capitalize alert alert-success">
                        {sucMes}
                    </div>
                ) : (
                    ""
                )}

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="email"
                            className={
                                !formik.errors
                                    ? "mt-1 form-control"
                                    : "mt-1 form-control"
                            }
                            name="email"
                            id="email"
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <div className="alert alert-danger mt-1">
                                {formik.errors.email}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">Password:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="password"
                            className={
                                !formik.errors
                                    ? "mt-1 form-control"
                                    : "mt-1 form-control"
                            }
                            name="password"
                            id="password"
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <div className="alert alert-danger mt-1">
                                {formik.errors.password}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <Link to={"/forget"} className="forget">
                        Forgot Password?
                    </Link>
                    {lodaing ? (
                        <button
                            disabled={!(formik.isValid && formik.dirty)}
                            className="btn bg-main text-white mt-3"
                            type="submit"
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn bg-main text-white mt-3"
                        >
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        </button>
                    )}
                </form>
            </div>
        </>
    );
}
