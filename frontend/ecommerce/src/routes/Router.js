import React from 'react'

import Home from '../pages/Home/index';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SellOnDaraz from '../pages/SellOnDaraz';
import SellerHome from '../pages/sellerHome';
import MyProducts from '../pages/MyProducts/MyProducts';
import ProductDetails from '../pages/productDetails/index'
import StoreDetails from "../pages/storeDetails/index"
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
        {
            path: "/sellerHome",
            element: <SellerHome />,
        },
        {
            path: "/sellerMyProducts",
            element: <MyProducts />,
        },
        {
            path: "/productDetails/:id",
            element: <ProductDetails />,
        },
        {
            path: "/StoreDetails/:id",
            element: <StoreDetails />,
        },
    ]);


    return (
        <RouterProvider router={router} />
    )
}

export default Router