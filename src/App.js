import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import Layout from "./Components/Layout/Layout";
import { UserCotextProvider } from "./Context/UserCotext";
import NoutFound from "./Components/NotFound/NoutFound";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import GuardRouting from "./Components/GuardRouting/GuardRouting";
import RegisterCheck from "./Components/RegisterCheck/RegisterCheck";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import Address from "./Components/Adress/Address";
import LoginCheck from "./Components/loginCheck/loginCheck";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import WishList from "./Components/wishList/wishList";
import WhisListContextProvider from "./Context/WhisListContext";
import Profile from "./Components/Profile/Profile";

function App() {
    let query = new QueryClient();
    let routes = createHashRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "home",
                    element: (
                        <GuardRouting>
                            <Home />
                        </GuardRouting>
                    ),
                },

                {
                    path: "/Products",
                    element: (
                        <GuardRouting>
                            <Products />
                        </GuardRouting>
                    ),
                },

                {
                    path: "/product/:id",
                    element: (
                        <GuardRouting>
                            <ProductDetails />
                        </GuardRouting>
                    ),
                },

                {
                    path: "/address/:id",
                    element: (
                        <GuardRouting>
                            <Address />
                        </GuardRouting>
                    ),
                },

                {
                    path: "/Cart",
                    element: (
                        <GuardRouting>
                            <Cart />
                        </GuardRouting>
                    ),
                },

                {
                    path: "/wishList",
                    element: (
                        <GuardRouting>
                            <WishList />
                        </GuardRouting>
                    ),
                },

                {
                    path: "/allorders",
                    element: (
                        <GuardRouting>
                            <Profile />
                        </GuardRouting>
                    ),
                },

                {
                    path: "/Categories",
                    element: (
                        <GuardRouting>
                            <Categories />
                        </GuardRouting>
                    ),
                },

                {
                    path: "/Brands",
                    element: (
                        <GuardRouting>
                            <Brands />
                        </GuardRouting>
                    ),
                },

                {
                    index: true,
                    element: (
                        <RegisterCheck>
                            <Register />
                        </RegisterCheck>
                    ),
                },

                {
                    path: "Login",
                    element: (
                        <LoginCheck>
                            <Login />
                        </LoginCheck>
                    ),
                },

                { path: "forget", element: <ForgetPassword /> },
                { path: "resetpassword", element: <ResetPassword /> },
                { path: "verifyCode", element: <VerifyCode /> },
                { path: "*", element: <NoutFound /> },
            ],
        },
    ]);

    return (
        <QueryClientProvider client={query}>
            <ReactQueryDevtools />
            <WhisListContextProvider>
                <UserCotextProvider>
                    <CartContextProvider>
                        <RouterProvider router={routes}></RouterProvider>
                    </CartContextProvider>
                </UserCotextProvider>
            </WhisListContextProvider>
        </QueryClientProvider>
    );
}

export default App;
