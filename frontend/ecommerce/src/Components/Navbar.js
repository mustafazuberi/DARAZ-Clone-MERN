import React from 'react'
import "./style.css"

import { useNavigate } from 'react-router-dom';

import { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';


import darazLogo from "./../images/daraz-logo.png"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import navbarDownloadImage from "./../images/navbarDownloadImage.png"

import axios from 'axios'
import Swal from 'sweetalert2';


import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DashboardIcon from '@mui/icons-material/Dashboard';


import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../store/index"


const baseUrl = "http://localhost:4000"
const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const authInfo = useSelector(state => state.authData)
    const isLoggined = useSelector(state => state.isAuthenticated)


    const { authData, isAuthenticated ,} = bindActionCreators(actionCreators, dispatch)




    const logout = async () => {
        try {
            let response = await axios.post(`${baseUrl}/logout`)
            authData({})
            isAuthenticated(false)
            await Swal.fire({
                title: ` Successfully logged in.`,
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(/images/trees.png)',
                backdrop: `
                  #ff54007d
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat `
            })
            navigate('/login')
        } catch (e) {
            console.log(e)
        }
    }





    // For dropdown Antd
    const items = [
        {
            key: '1',
            label: (
                <a style={{ textDecoration: "none" }} onClick={() => navigate('/myOrders')}>
                    <DashboardIcon style={{ color: "grey" }} /> My Orders
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a style={{ textDecoration: "none" }} onClick={() => navigate('/userWishList')}>
                    <FavoriteBorderIcon style={{ color: "grey" }} /> My Wishlist
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a style={{ textDecoration: "none" }} onClick={logout}>
                    <LogoutIcon style={{ color: "grey" }} /> Logout
                </a>
            ),
        },
    ];
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   


    const cartItems = useSelector(state => state.cartItems)


    return (
        <div className='mainNavbar'>
            <div className="sec1">








                <div className="sec1LinkItem" style={isLoggined ? { display: "none" } : { display: "flex" }}><span onClick={isLoggined ? () => null : () => navigate('/sellOnDaraz')}> Sell on Daraz</span></div>
                <div className="sec1LinkItem" style={isLoggined ? { display: "none" } : { display: "flex" }}><span onClick={isLoggined ? () => null : () => navigate('/login')}> login</span></div>
                <div className="sec1LinkItem" style={isLoggined ? { display: "flex" } : { display: "none" }}><span onClick={isLoggined ? () => null : () => navigate('/login')}>
                    <Dropdown menu={{ items }} placement="topLeft">
                        <Button style={{ borderColor: "#f85606" }}>{isLoggined ? authInfo.fullName + "'s account" : "login"}</Button>
                    </Dropdown>
                </span></div>
                <div className="sec1LinkItem" style={isLoggined ? { display: "none" } : { display: "flex" }}><span onClick={isLoggined ? () => null : () => navigate('/signup')}> signup</span></div>
            </div>

            <div className="sec2">
                <div className="logo"><img src={darazLogo} className='darazLogo' alt="" style={{ cursor: "pointer" }} onClick={() => navigate('/')} /></div>
                <div className="searchBar">
                    <div className="wSearch">
                        <div className="searchInp"><input type="text" placeholder='Search in Daraz' /></div>
                        <div className="searchIcon"><SearchIcon style={{ color: "white", cursor: "pointer" }} /></div>
                    </div>
                </div>
                <div className="cart" onClick={() => navigate('/userCart')}><ShoppingCartCheckoutIcon style={{ cursor: "pointer" }} /> {cartItems.length !== 0 ? <span className="qtyOfItems">{cartItems.length}</span> : <span className=""></span>}</div>
                <div className="download"><img src={navbarDownloadImage} className="navbarDownloadImage" alt="" /></div>
            </div>
        </div >
    )
}

export default Navbar
