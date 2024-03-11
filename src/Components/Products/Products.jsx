import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useQuery } from "react-query";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Products() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const { isLoading, data, refetch } = useQuery(
        ["products", page],
        () => getProducts(page),
        {
            cacheTime: 300000,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchInterval: 1800000,
        }
    );

    useEffect(() => {
        refetch();
    }, [query, page]); // Refetch data when query or page changes

    function getProducts(page) {
        return axios.get(
            `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
        );
    }

    function handleChange(e) {
        setQuery(e.target.value);
    }

    function filterItems(items, query) {
        query = query.toLowerCase();
        return items.filter((item) => {
            return item.title.toLowerCase().includes(query);
        });
    }

    const searchedData = data ? filterItems(data.data.data, query) : [];

    function getPage(pageNum) {
        setPage(pageNum);
    }

    return (
        <>
            {isLoading && <Loader />}
            <div className="container mb-5 p-5 pb-2">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart - Products</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
                <input
                    type="text"
                    className="form-control mx-auto search my-3"
                    placeholder="Search"
                    value={query}
                    onChange={handleChange}
                />
                <div className="row">
                    {searchedData.length === 0 && (
                        <p className="alert alert-success p-3">
                            No products found.
                        </p>
                    )}
                    {searchedData.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
                <nav aria-label="Page navigation example" className="mt-4 ">
                    <ul className="pagination align-items-center  justify-content-center">
                        <li className="page-item cursor-pointer ">
                            <Link
                                className="page-link  text-black"
                                onClick={() => getPage(1)}
                            >
                                1
                            </Link>
                        </li>
                        <li className="page-item cursor-pointer ">
                            <Link
                                className="page-link  text-black"
                                onClick={() => getPage(2)}
                            >
                                2
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
