import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";
import Products from "../Products/Products";
import HomeSlider from "../Slider/HomeSlider";

export default function Home() {
    return (
        <div className="container px-0 mt-5 products-container rounded-3">
            <HomeSlider />
            <CategorySlider />
            <Products />
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart - Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>
    );
}
