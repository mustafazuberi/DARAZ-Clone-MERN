import React from 'react'
import { useSelector } from 'react-redux';

import Home from '../pages/Home/index';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SellOnDaraz from '../pages/SellOnDaraz';
import SellerHome from '../pages/sellerHome';
import MyProducts from '../pages/MyProducts/MyProducts';
import ProductDetails from '../pages/productDetails/index'
import StoreDetails from "../pages/storeDetails/index"
import UserWishList from "../pages/userWishList/index"
import UserCart from "../pages/UserCart/index"
import MyOrders from "../pages/MyOrders/index"
import SellerDashboard from "../pages/SellerDashboard"



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
        {
            path: "/userWishList",
            element: <UserWishList />,
        },
        {
            path: "/userCart",
            element: <UserCart />,
        },
        {
            path: "/sellerDashboard",
            element: <SellerDashboard />,
        },
        {
            path: "/myOrders",
            element: <MyOrders />,
        },
    ]);


    return (
        <RouterProvider router={router} />
    )
}

export default Router