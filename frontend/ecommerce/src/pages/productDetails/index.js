import React, { useEffect, useState } from 'react'
import './style.css'

import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'


import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material'


const baseUrl = "http://localhost:4000"
const Index = () => {

    const navigate = useNavigate()



    let [productQty, setProductQty] = useState(0)



    const productId = useParams().id
    const [productDetail, setProductDetail] = useState({})
    const [storeOwner, setStoreOwner] = useState({})
    useEffect(() => {


        const detailPageData = async () => {
            window.scrollTo(0, 0);
            try {
                const response = await axios.get(`${baseUrl}/detailPageProduct/${productId}`)
                setProductDetail(response.data)
                console.log(response.data)

                // getting data of seller who is selling this product
                const responseStore = await axios.get(`${baseUrl}/detailPageSeller/${response.data.sellerId}`)
                setStoreOwner(responseStore.data)

            } catch (e) {
                console.log(e)
            }
        }
        detailPageData()




    }, [])









    return (
        <>
            <Navbar />
            <div className="detailSecBody my-3" style={{ backgroundColor: "#ececec", paddingTop: '10px', height: "auto" }}>

                <div className="detailMainContainer" style={{ backgroundColor: "white" }}>
                    <div className="ImageDiv">
                        <img src={productDetail.productImage} alt="" />
                    </div>
                    <div className="detailDiv">
                        <div className="accptCart">

                            <h1>{productDetail.productName}</h1>

                            <p className='productDesc'>{productDetail.productDescription}</p>
                            <h2>PKR {productDetail.productPrice} </h2>
                        </div>
                        <p className="productCategory">Category : {productDetail.productCategory}</p>


                        <div className="qtyDiv">
                            <span className="qtText">Quantity</span>
                            <button className='qtBtn' disabled={productQty ? false : true} onClick={() => setProductQty(--productQty)} ><RemoveIcon style={{ fontSize: "12px" }} /></button>
                            <span className="qty">{productQty}</span>
                            <button className='qtBtn'><AddIcon style={{ fontSize: "12px" }} onClick={() => setProductQty(++productQty)} /></button>
                        </div>

                        <div className="cartDiv my-5">
                            <button className='addToWishList'>Add to wishlist</button>
                            <button className='addToCart'>Add to cart</button>
                        </div>
                    </div>
                </div>




                <div className="sellerSec">
                    <div className="chatsec">
                        <div className="storeName">
                            <span style={{ color: "grey", fontSize: "14px" }}>Sold by</span> : <span className="storeName">{storeOwner.shopName}</span>
                        </div>
                        <div className="chat" style={{ color: "#2abbe8", cursor: 'pointer' }} >
                            Chat <ChatBubbleIcon style={{ color: "#2abbe8", fontSize: "13px" }} />
                        </div>
                    </div>
                    <div className="address">
                        Store Address :  <LocationOnIcon style={{ color: "grey" }} />  {storeOwner.city}, {storeOwner.country}
                    </div>
                    <div className="delivery" onClick={() => navigate(`/StoreDetails/${storeOwner._id}`)}>View Store</div>
                </div>










                <h6 className='mt-5' style={{ paddingLeft: "60px" }}>Ratings & Reviews of {productDetail.productName}</h6>
                <div className="reviewSec">
                    <div className="reviews">
                        <h1>No reviews Yet</h1>
                    </div>
                </div>

                <h6 className='mt-5' style={{ paddingLeft: "60px" }}>Comments</h6>
                <div className="commentSec">
                    <div className="comments">
                        <h1>No Comments Yet</h1>
                    </div>

                    <div className="inpComm">
                        <div style={{ width: "95%" }}><TextField id="standard-basic" label="Leave a comment" style={{ width: "100%" }} variant="standard" /></div>
                        <div className='mx-2'><SendIcon style={{ color: "#f85606", cursor: "pointer", position: "relative", marginTop: "20px " }} /></div>
                    </div>
                </div>

                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />






                <Footer />
            </div>

        </>
    )
}

export default Index
