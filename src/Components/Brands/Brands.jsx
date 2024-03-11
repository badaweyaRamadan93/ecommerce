import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

export default function Brands() {
    function getBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }

    async function getSpecificBrand(brandId) {
        let { data } = await axios(
            `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
        ).catch((err) => err);
        console.log(data.data);
        Swal.fire({
            imageUrl: data.data.image,
            imageAlt: "A brand image",
            title: data.data.name,
            // showCancelButton: true,
            confirmButtonText: "Cancel",
            confirmButtonColor: "#0aad0a",
        });
    }

    let { data, isLoading } = useQuery("Brand", getBrands, {
        cacheTime: 300000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: 1800000,
    });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="container p-5 products-container mt-5 rounded-3">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Fresh Cart - Brands</title>
                        <link
                            rel="canonical"
                            href="http://mysite.com/example"
                        />
                    </Helmet>{" "}
                    <div className="row g-5">
                        {data?.data?.data?.map((brand) => {
                            return (
                                <div
                                    key={brand._id}
                                    className="cursor-pointer col-md-4 col-sm-6 col-lg-3"
                                >
                                    <div
                                        onClick={() =>
                                            getSpecificBrand(brand._id)
                                        }
                                        className="card"
                                    >
                                        <img
                                            src={brand.image}
                                            className="card-img-top"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title text-center text-capitalize m-0 fw-bolder">
                                                {brand.name}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
