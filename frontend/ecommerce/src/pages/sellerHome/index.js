import { useState } from "react";
import './style.css'
import axios from "axios";


import SellerNavbar from "../../Components/SellerNavbar";

import { useSelector } from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import GroupsIcon from '@mui/icons-material/Groups';
import { Button } from "antd";






const baseUrl = "http://localhost:4000"
const SellerHome = () => {
    const isSeller = useSelector(state => state.isSeller)
    const sellerAuth = useSelector(state => state.sellerAuth)


    return (
        <>
            <SellerNavbar />

            <div className="overviewProfile">

                <div className="overviewDiv orders">
                    <div className="content">
                        <h4>0</h4>
                        <span>Orders</span>

                    </div>
                    <div className="icon">
                        <ShoppingCartIcon style={{ fontSize: "55px" }} />
                    </div>
                </div>

                <div className="overviewDiv products">
                    <div className="content">
                        <h4>0</h4>
                        <span>Products</span>

                    </div>
                    <div className="icon">
                        <ShoppingBasketIcon style={{ fontSize: "55px" }} />
                    </div>
                </div>

                <div className="overviewDiv followers">
                    <div className="content">
                        <h4>200</h4>
                        <span>Followers</span>

                    </div>
                    <div className="icon">
                        <GroupsIcon style={{ fontSize: "55px" }} />
                    </div>
                </div>


            </div>



            <div className="latest">
                <div className="latestOrders">
                    <div className="heading">
                        <h4>Latest Orders</h4>
                    </div>
                    <div className="headingsRow">
                        <div>Order</div>
                        <div>Status</div>
                        <div>Total</div>
                        <div>Date</div>
                        <div>Details</div>
                    </div>
                    <div className="productItemsLatest">
                        <br /><br />
                    </div>
                    <div className="viewAll">
                        <Button variant="outlined">View All</Button>
                    </div>

                </div>


                <div className="latestproducts">
                    <div className="heading">
                        <h4>Latest Orders</h4>
                    </div>
                    <div className="headingsRow">
                        <div>Order</div>
                        <div>Status</div>
                        <div>Total</div>
                        <div>Date</div>
                        <div>Details</div>
                    </div>
                    <div className="productItemsLatest">
                        <br /><br />
                    </div>
                    <div className="viewAll">
                        <Button variant="outlined">View All</Button>
                    </div>
                </div>

            </div>






        </>
    );
};


export default SellerHome
