import App from "@/App";
import About from "@/page/About";
import AllUsers from "@/page/AllUsers";
import Cart from "@/page/Cart";
import Categories from "@/page/Categories";
import Contact from "@/page/Contact";
import Home from "@/page/Home";
import MyAccount from "@/page/MyAccount";
import ProductCreated from "@/page/ProductCreated";
import SignIn from "@/page/SignIn";
import SignUp from "@/page/SignUp";
import {
    createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,

            },
            {
                path: '/cart',
                element: <Cart />
            },
            {

                path: '/signup',
                element: <SignUp />
            },
            {
                path: "/signin",
                element: <SignIn />
            },
            {
                path: '/myaccount',
                element: <MyAccount />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: "/categories",
                element: <Categories />
            },
            {
                path: "/productCreated",
                element: <ProductCreated />
            },
            {
                path: '/allUsers',
                element: <AllUsers />
            }


        ]
    },
]);

export default router