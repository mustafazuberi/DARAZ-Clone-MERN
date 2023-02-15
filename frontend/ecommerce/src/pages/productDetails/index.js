import React, { useEffect, useState } from 'react'
import './style.css'

import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import swal from 'sweetalert'
import Swal from 'sweetalert2'

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
import { useSelector } from 'react-redux'


import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../../store/index"



import { Button } from 'antd';
import { Drawer, Space } from 'antd';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Input } from 'antd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




// const baseUrl = "http://localhost:4000"
const baseUrl = "https://odd-rose-snapper-tie.cyclic.app/"

const Index = () => {

    const navigate = useNavigate()
    const authInfo = useSelector(state => state.authData)


    const dispatch = useDispatch()
    const { authData, addToCart } = bindActionCreators(actionCreators, dispatch)






    const productId = useParams().id
    const [comments, setComments] = useState([])
    const [productDetail, setProductDetail] = useState({})
    const [storeOwner, setStoreOwner] = useState({})
    useEffect(() => {


        const detailPageData = async () => {
            window.scrollTo(0, 0);
            try {
                const response = await axios.get(`${baseUrl}/detailPageProduct/${productId}`)
                setProductDetail(response.data)
                setComments(response.data.comments)
                // getting data of seller who is selling this product
                const responseStore = await axios.get(`${baseUrl}/detailPageSeller/${response.data.sellerId}`)
                setStoreOwner(responseStore.data)

            } catch (e) {
                console.log(e)
            }
        }
        detailPageData()



    }, [])




    const addToWishlist = async (product) => {
        if (authInfo.wishlist) {
            for (let item of authInfo.wishlist) {
                if (item.item._id === product._id) {
                    swal("Item already available in your wishlish.")
                    return
                }
            }
        }
        try {
            const response = await axios.post(`${baseUrl}/addToWishlist/${authInfo._id}`, {
                product
            })
            const userUpdatedData = await axios.get(`${baseUrl}/getUserData/${authInfo._id}`)
            authData(userUpdatedData.data)
            swal(response.data.message)
        } catch (e) {
            console.log(e)
        }
    }


    const cartItems = useSelector(state => state.cartItems)
    const [available, setAvailable] = useState(false)
    useEffect(() => {
        cartItems.forEach(item => {
            if (item._id === productDetail._id) {
                setAvailable(true)
            }
        });
    }, [])
    const addItemInCart = () => {
        if (available) {
            Swal.fire({
                icon: 'error',
                text: "Already available in your cart!",
            })
            return
        }

        if (cartItems.length !== 0 && cartItems[0].sellerId !== productDetail.sellerId) {
            Swal.fire({
                icon: 'error',
                text: "Sorry, you cannot add items from more than one store to your cart.",
            })
            return
        } else {
            addToCart(productDetail)
            swal("Item added in your cart.")
            setAvailable(true)
        }
    }










    // Chat work

    const [allChats, setAllChats] = useState([])
    useEffect(() => {
        const getChats = async () => {
            const response = await axios.get(`${baseUrl}/getChats`)
            const mychats = response.data.filter(item => item.userId === authInfo._id)
            setAllChats(mychats)
        }
        getChats()



    }, [])






    // Showing Message screen and setting room id to get all messages
    const [roomId, setRoomId] = useState('')

    const [messageScreen, setMessageScreen] = useState(false)
    const [sellerToMessage, setSellerToMessage] = useState({})
    const showMessageScreen = async (item) => {
        setMessageScreen(true)
        setSellerToMessage(item)

        setRoomId(authInfo._id + item.sellerId)
        const response = await axios.get(`${baseUrl}/getMessages/${authInfo._id + item.sellerId}`)
        setAllMessages(response.data.messages)

        // if (response.data.messages) {
        //     const responseRealTime = await axios.get(`${baseUrl}/getRealTimeMessages/${authInfo._id + item.sellerId}`)
        //     setAllMessages(responseRealTime.data.messages)
        // }


    }



    // Creating Chatroom if not available
    const createChat = async () => {
        console.log(authInfo._id + storeOwner._id)
        allChats.forEach((item) => {
            if (item._id === authInfo._id + storeOwner._id) {
                setOpen(true)
                return
            }
        })
        const response = await axios.post(`${baseUrl}/createChat`, {
            userId: authInfo._id,
            sellerId: storeOwner._id,
            userName: authInfo.fullName,
            sellerName: storeOwner.shopName,
            sellerImageUrl: storeOwner.shopImageUrl,
            messages: []
        })
        const response2 = await axios.get(`${baseUrl}/getChats`)
        const mychats = response2.data.filter(item => item.userId === authInfo._id)
        setAllChats(mychats)
        setOpen(true)
    }






    // Drawer
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('right');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        setMessageScreen(false)
    };
    const onChange = (e) => {
        setPlacement(e.target.value);
    };







    // send Message Function
    const [allMessages, setAllMessages] = useState([])
    const [messageText, setMessageText] = useState('')
    const sendMessage = async () => {
        const response = await axios.post(`${baseUrl}/sendMessage`, {
            text: messageText,
            chatRoomId: roomId,
            sendBy: authInfo._id,
            sendTo: sellerToMessage.sellerId
        })
        setMessageText('')
        const response2 = await axios.get(`${baseUrl}/getMessages/${roomId}`)
        setAllMessages(response2.data.messages)

        // for running useEffect again to get messages
    }









    const [commentText, setCommentText] = useState('')
    const comment = async () => {
        if (commentText === '') {
            return
        }
        const response = await axios.post(`${baseUrl}/comment`, {
            commentText: commentText,
            commentedBy: authInfo._id,
            commentedbyUserName: authInfo.fullName,
            productId: productDetail._id
        })
        console.log(response)
        setCommentText('')

        const response2 = await axios.get(`${baseUrl}/getComments/${productDetail._id}`)
        setComments(response2.data.comments)
    }




    // Protective Routing
    const isLoggined = useSelector(state => state.isAuthenticated)
    useEffect(() => {
        if (isLoggined) {
            return
        } else {
            navigate('/login')
        }
    }, [])
    ///////////////////////////////







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




                        <div className="cartDiv my-5">
                            <button className='addToWishList' onClick={() => addToWishlist(productDetail)}>Add to wishlist</button>
                            <button className='addToCart' onClick={addItemInCart}>Add to cart</button>
                        </div>
                    </div>
                </div>




                <div className="sellerSec">
                    <div className="chatsec">
                        <div className="storeName">
                            <span style={{ color: "grey", fontSize: "14px" }}>Sold by</span> : <span className="storeName">{storeOwner.shopName}</span>
                        </div>
                        <div className="chat" onClick={createChat} style={{ color: "#2abbe8", cursor: 'pointer' }} >
                            Chat <ChatBubbleIcon style={{ color: "#2abbe8", fontSize: "13px" }} />
                        </div>
                    </div>
                    <div className="address">
                        Store Address :  <LocationOnIcon style={{ color: "grey" }} />  {storeOwner.city}, {storeOwner.country}
                    </div>
                    <div className="delivery" onClick={() => navigate(`/StoreDetails/${storeOwner._id}`)}>View Store</div>
                </div>











                <h6 className='mt-5' style={{ paddingLeft: "60px" }}>Comments</h6>
                <div className="commentSec">
                    <div className="comments my-5">
                        {
                            comment !== [] ?
                                comments.map((item, index) => {
                                    return <div key={index} className='commentBox'>
                                        <div className="commentName"><AccountCircleIcon className='mx-2 mt-1' style={{ color: "#da4e08" }} />{item.item.commentedbyUserName}:  </div>
                                        <div className="commentText">{item.item.commentText}</div>

                                    </div>
                                }) : <h1>No Comments Yet</h1>
                        }
                    </div>

                    <div className="inpComm my-5">
                        <div style={{ width: "95%" }}><TextField value={commentText} id="standard-basic" onChange={(e) => setCommentText(e.target.value)} label="Leave a comment" style={{ width: "100%" }} variant="standard" /></div>
                        <div className='mx-2'><SendIcon onClick={comment} style={{ color: "#f85606", cursor: "pointer", position: "relative", marginTop: "20px " }} /></div>
                    </div>
                </div>

                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
















                {/* For Drawer */}

                <div onClick={showDrawer} type="primary" className='msgsBtn' >
                    <ChatBubbleIcon className='mx-1' />   Messages
                </div>


                <Drawer
                    title={messageScreen ? "" : "Messages"}
                    placement={placement}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    key={placement}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                        </Space>
                    }
                >
                    <div className="usersScreen">

                        <div className="userItem" style={messageScreen ? { display: "none" } : { display: "block" }}>
                            {
                                allChats.map((item, index) => {
                                    return <div className="chatBoxItem p-2" key={index} onClick={() => showMessageScreen(item)}>
                                        <div className="profile">
                                            <img src={item.sellerImageUrl} />
                                        </div>
                                        <div className="p-2 sellerName">
                                            {item.sellerName}
                                        </div>
                                    </div>
                                })
                            }
                        </div>



                        {/* Msg Screen */}
                        <div className="messageScreen" style={messageScreen ? { display: "block" } : { display: "none" }}>
                            <div className="msgScrenHeader">
                                <KeyboardBackspaceIcon className='mx-2 mt-2' style={{ cursor: "pointer" }} onClick={() => setMessageScreen(false)} />
                                <div className="profile">
                                    <img src={sellerToMessage.sellerImageUrl} alt="" />
                                </div>
                                <div className="mx-2 mt-2 sellerName">
                                    {sellerToMessage.sellerName}
                                </div>
                            </div>

                            <div className="allMsgs">
                                {
                                    allMessages ? allMessages.map((item, index) => {
                                        if (item.msgItem.sendBy === authInfo._id) {
                                            return <div key={index} className="currentUserMsg">
                                                {item.msgItem.text}
                                                <span className="time">3:28</span>
                                            </div>
                                        } else {
                                            return <div className="friendMsg" key={index}>
                                                {item.msgItem.text}                                                <span className="time">3:48</span>
                                            </div>
                                        }
                                    })
                                        : ""
                                }
                            </div>

                            <div className="sendInpBox">
                                <Input placeholder="Send Message Here!" value={messageText} onChange={(e) => setMessageText(e.target.value)} allowClear /><SendIcon onClick={sendMessage} className='mx-2' style={{ color: "#da4e08" }} />
                            </div>
                        </div>
                    </div>


                </Drawer>











                <Footer />
            </div >

        </>
    )
}

export default Index








