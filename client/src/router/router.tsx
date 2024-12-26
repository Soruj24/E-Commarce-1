import App from "@/App";
import Cart from "@/page/Cart";
import Home from "@/page/Home";
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
            }


        ]
    },
]);

export default router