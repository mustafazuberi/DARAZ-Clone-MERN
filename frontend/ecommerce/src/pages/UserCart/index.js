import React, { useState, useEffect } from 'react'
import "./style.css"
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

import { UserOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { useSelector } from 'react-redux';


import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DeleteIcon } from '@chakra-ui/icons'


import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../../store/index"
import swal from 'sweetalert';







const UserCart = () => {

    let [productQty, setProductQty] = useState(0)

    const dispatch = useDispatch()
    const { removeFromCart } = bindActionCreators(actionCreators, dispatch)


    const [orderName, setOrderName] = useState('')
    const [orderPhone, setOrderPhone] = useState('')

    const cartItems = useSelector(state => state.cartItems)
    console.log("cartItems", cartItems)



    const deleteProductFromCart = (e) => {
        removeFromCart(e)
        swal("Item deleted from cart successfully!")
    }




    return (
        <>
            <Navbar />

            <div className="cartMainPage">

                <div className="cart">
                    <div className="cartItemsDiv">
                        <div className="itemsHeading">
                            <h6>Your cart (0 items)</h6>
                        </div>
                        <div className="cartItems">


                            {
                                cartItems.map((item, index) => {
                                    return <div className="item" key={index}>
                                        <div className="right">
                                            <div className="img">
                                                <img src={item.productImage} alt="" />
                                            </div>
                                            <div className="mainDetails p-2">
                                                <h4>{item.productName}</h4>
                                                <h6>Category : {item.productCategory}</h6>
                                                <h6>{item.productPrice}</h6>
                                            </div>
                                        </div>
                                        <div className="buttons">
                                            <Button className='deleteBtn' onClick={() => deleteProductFromCart(item)} colorscheme='gray' ><DeleteIcon /> delete</Button>
                                            <div className="qtyDiv">
                                                <span className="qtText">Quantity</span>
                                                <button className='qtBtn' disabled={productQty ? false : true} onClick={() => setProductQty(--productQty)} ><RemoveIcon style={{ fontSize: "12px" }} /></button>
                                                <span className="qty">{productQty}</span>
                                                <button className='qtBtn'><AddIcon style={{ fontSize: "12px" }} onClick={() => setProductQty(++productQty)} /></button>
                                            </div>
                                        </div>

                                    </div>
                                })
                            }




                        </div>
                    </div>

                    <div className="checkOutDiv">
                        <h5>Order Summary</h5>
                        <h6>Subtotal (0 items)</h6>
                        <Input size="large" value={orderName} onChange={(e) => setOrderName(e.target.value)} placeholder="Enter Your Name" />
                        <Input size="large" value={orderPhone} onChange={(e) => setOrderPhone(e.target.value)} placeholder="Enter Your Phone Number" className='my-2' />
                        <button className='proceed'>PROCEED TO CHECKOUT</button>

                    </div>


                </div>



            </div>

            <Footer />
        </>
    )
}

export default UserCart




