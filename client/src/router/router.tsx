import App from "@/App";
import Cart from "@/page/Cart";
import Home from "@/page/Home";
import MyAccount from "@/page/MyAccount";
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
            }


        ]
    },
]);

export default router