import React from 'react'

import Home from '../pages/Home';
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
    ]);


    return (
        <RouterProvider router={router} />
    )
}

export default Router