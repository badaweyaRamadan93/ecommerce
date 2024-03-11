import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
    let [categoryList, setCategoryList] = useState(null);
    useEffect(() => {
        getCategoryList();
    }, []);
    async function getCategoryList() {
        let { data } = await axios(
            `https://ecommerce.routemisr.com/api/v1/categories`
        ).catch((err) => err);
        setCategoryList(data.data);
    }

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
        ],
    };
    return (
        <div className="container p-0 m-0">
            <Slider {...settings}>
                {categoryList?.map((el) => {
                    return (
                        <div className="item slide" key={el._id}>
                            <img
                                className="w-100"
                                src={el.image}
                                height={250}
                                alt=""
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
