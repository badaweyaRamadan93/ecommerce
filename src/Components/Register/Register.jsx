import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navg = useNavigate();
    let [errMes, setErr] = useState("");
    let [sucMes, setSuc] = useState("");
    let [lodaing, setLoading] = useState(true);

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    // Formik calidationSchema
    let validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Name minlength is 3")
            .max(10, "Name maxlength is 10")
            .required("Name is required"),
        email: Yup.string()
            .email("Email is Invalid")
            .required("Email is required"),
        age: Yup.number().min(16, "Min Age is 16"),
        phone: Yup.string()
            .matches(phoneRegExp, "Phone is invalid")
            .required("Phone is required"),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                "At least 8 characters long, Contains at least one uppercase letter And, Contains at least one lowercase letter."
            )
            .required("Password is required"),
        rePassword: Yup.string()
            .oneOf([Yup.ref("password")], "Must match the password")
            .required("RePassword is required"),
    });

    // Formik setup
    let formik = useFormik({
        //intial values
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
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
            .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            .catch(function (err) {
                setErr(err.response.data.message);
                setSuc("");
                setLoading(true);
            });
        if (req.data.message == "success") {
            setSuc(req.data.message);
            setLoading(true);
            navg("/login");
        }
    }
    // ############################################
    // ############################################
    // ############################################
    return (
        <>
            <div className="container py-5">
                <h1>Register Now</h1>
                {errMes && !sucMes ? (
                    <div className="alert alert-danger">{errMes}</div>
                ) : (
                    ""
                )}

                {sucMes ? (
                    <div className="alert alert-success">{sucMes}</div>
                ) : (
                    ""
                )}

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">Name:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={
                                formik.touched.name
                                    ? "mt-1 form-control"
                                    : "mt-1 form-control"
                            }
                            name="name"
                            id="name"
                        />
                        {formik.errors.name && formik.touched.name && (
                            <div className="alert alert-danger mt-1">
                                {formik.errors.name}
                            </div>
                        )}
                    </div>

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

                    <div className="mb-3">
                        <label htmlFor="rePassword">Repassword:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="password"
                            className={
                                !formik.errors
                                    ? "mt-1 form-control"
                                    : "mt-1 form-control"
                            }
                            name="rePassword"
                            id="rePassword"
                        />
                        {formik.errors.rePassword &&
                        formik.touched.rePassword ? (
                            <div className="alert alert-danger mt-1">
                                {formik.errors.rePassword}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="tel"
                            className={
                                !formik.errors
                                    ? "mt-1 form-control"
                                    : "mt-1 form-control"
                            }
                            name="phone"
                            id="phone"
                        />
                        {formik.errors.phone && formik.touched.phone ? (
                            <div className="alert alert-danger">
                                {" "}
                                {formik.errors.phone}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

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

// regex without yup
// function validate(values) {
//     console.log("validate");
//     let errors = {};
//     const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

//     if (!values.name) {
//         errors.name = "Name is Required";
//     } else if (values.name.length < 3) {
//         errors.name = "Name minlength is 3!";
//     } else if (values.name.length > 10) {
//         errors.name = "Name maxlength is 10!";
//     }

//     if (!values.phone) {
//         errors.phone = "Phone is required";
//     }

//     if (!emailRegex.test(values.email)) {
//         errors.email = "Enter a valid Email";
//     }
//     return errors;
// }
