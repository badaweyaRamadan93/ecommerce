import React from "react";
import img1 from "../../Assets/images/slider-image-1.jpeg";
import img2 from "../../Assets/images/slider-image-2.jpeg";
import img3 from "../../Assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function HomeSlider() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <div className="container px-0">
            <div className="row g-0">
                <div className="col-md-9 slide">
                    <Slider {...settings}>
                        <img
                            className="w-100 rounded-top-left"
                            src={img1}
                            height={400}
                            alt=""
                        />
                        <img
                            className="w-100 rounded-top-left"
                            src={img2}
                            height={400}
                            alt=""
                        />
                        <img
                            className="w-100 rounded-top-left"
                            src={img3}
                            height={400}
                            alt=""
                        />
                    </Slider>
                </div>
                <div className="col-md-3">
                    <img
                        className="w-100 rounded-top-right"
                        src={img2}
                        height={200}
                        alt=""
                    />
                    <img className="w-100 " src={img3} height={200} alt="" />
                </div>
            </div>
        </div>
    );
}
