import React from 'react'

import Home from '../pages/Home/index';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SellOnDaraz from '../pages/SellOnDaraz';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";



const Router = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/sellOnDaraz",
            element: <SellOnDaraz />,
        },
    ]);


    return (
        <RouterProvider router={router} />
    )
}

export default Router