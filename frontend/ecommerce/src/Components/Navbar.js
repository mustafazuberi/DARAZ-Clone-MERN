import React from 'react'
import "./style.css"

import { useNavigate } from 'react-router-dom';


import darazLogo from "./../images/daraz-logo.png"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import navbarDownloadImage from "./../images/navbarDownloadImage.png"


const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='mainNavbar'>
            <div className="sec1">
                <div className="sec1LinkItem"><span onClick={() => navigate('/sellOnDaraz')}> Sell on daraz</span></div>
                <div className="sec1LinkItem"><span onClick={() => navigate('/login')}> login</span></div>
                <div className="sec1LinkItem"><span onClick={() => navigate('/signup')}> signup</span></div>
            </div>

            <div className="sec2">
                <div className="logo"><img src={darazLogo} className='darazLogo' alt="" style={{ cursor: "pointer" }} onClick={() => navigate('/')} /></div>
                <div className="searchBar">
                    <div className="wSearch">
                        <div className="searchInp"><input type="text" placeholder='Search in Daraz' /></div>
                        <div className="searchIcon"><SearchIcon style={{ color: "white", cursor: "pointer" }} /></div>
                    </div>
                </div>
                <div className="cart"><ShoppingCartCheckoutIcon style={{ cursor: "pointer" }} /></div>
                <div className="download"><img src={navbarDownloadImage} className="navbarDownloadImage" alt="" /></div>
            </div>
        </div>
    )
}

export default Navbar
