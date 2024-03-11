import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Address() {
    let navg = useNavigate();
    let { checkOut, checkOutVisa, setCartCounter } = useContext(CartContext);
    let cartId = useParams().id;
    let [isLoading, setIsLoading] = useState(false);
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    let validationSchema = Yup.object({
        city: Yup.string().required("City is required"),
        phone: Yup.string()
            .matches(phoneRegExp, "Please Enter A Valid Number")
            .required("Phone is required"),
        details: Yup.string().required("Details is required"),
    });
    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema,
        onSubmit: checkOutHandlerVisa,
    });

    async function checkOutHandler(val, e) {
        e.preventDefault();
        setIsLoading(true);
        let response = await checkOut(cartId, val).catch((err) => err);
        if (response.data.status === "success") {
            setCartCounter(0)
            navg("/");
        }
        setIsLoading(false);
    }

    async function checkOutHandlerVisa(val) {
        setIsLoading(true);
        let response = await checkOutVisa(cartId, val).catch((err) => err);
        if (response.data.status === "success") {
            window.open(response.data.session.url, "_self");
        }
        setIsLoading(false);
    }

    return (
        <div className="container py-5">
            <Toaster />
            <h1 className="mb-3">Address</h1>
            <form>
                <div className="input">
                    <label htmlFor="phone">Phone: </label>
                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="phone"
                        type="tel"
                        name="phone"
                        className="form-control mb-3 mt-1"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="alert alert-danger">
                            {formik.errors.phone}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="input">
                    <label htmlFor="city">City: </label>
                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="city"
                        type="text"
                        name="city"
                        className="form-control mb-3 mt-1"
                    />
                    {formik.touched.city && formik.errors.city ? (
                        <div className="alert alert-danger">
                            {formik.errors.city}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="input">
                    <label htmlFor="details">Details: </label>
                    <textarea
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="details"
                        name="details"
                        className="form-control mb-3 mt-1"
                    ></textarea>
                    {formik.touched.details && formik.errors.details ? (
                        <div className="alert alert-danger">
                            {formik.errors.details}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                {isLoading ? (
                    <button className="btn bg-main text-white">
                        <i className="fa fa-spinner fa-spin"></i>
                    </button>
                ) : (
                    <button
                        disabled={!(formik.isValid && formik.dirty)}
                        type="button"
                        className="btn bg-main text-white"
                        onClick={(e) => checkOutHandler(formik.values, e)}
                    >
                        {" "}
                        Pay by Cash
                    </button>
                )}
                {isLoading ? (
                    <button className="btn ms-2 bg-main text-white">
                        <i className="fa fa-spinner fa-spin"></i>
                    </button>
                ) : (
                    <button
                        disabled={!(formik.isValid && formik.dirty)}
                        type="submit"
                        onClick={formik.handleSubmit}
                        className="btn ms-2 bg-main text-white"
                    >
                        {" "}
                        Pay by Visa
                    </button>
                )}
            </form>
        </div>
    );
}
