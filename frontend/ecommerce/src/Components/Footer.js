import React from 'react'
import "./style.css"

import qr from "./../images/qr.png"
import shopFooterImage from "./../images/footerHappyShoppin.png"
import appStore from "./../images/appStore.svg"
import appGoogle from "./../images/googlePlay.svg"
import appGallery from "./../images/appGallery.png"

const Footer = () => {
    return (
        <div>
            <div className="f1">
                <div className="cutomer my-4">
                    <h5>Customer Care</h5>
                    <li>Help Center</li>
                    <li>Hot to Buy</li>
                    <li>Corporate & Bulk Purchasing</li>
                    <li>Returns & Refunds</li>
                    <li>Daraz Shop</li>
                    <li>Purchase Protection</li>
                    <li>Daraz Pickup Points</li>
                    <h5 className='mt-4'>Make Money With Us </h5>
                    <li>Daraz University</li>
                    <li>Sell on Daraz</li>
                    <li>Join Daraz Affiliate Program</li>
                </div>
                <div className="daraz my-4">
                    <h5>Daraz</h5>
                    <li>About Us</li>
                    <li>Digital Payments</li>
                    <li>Daraz Cares</li>
                    <li>Daraz Blogs</li>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                    <li>NTN Number: 4012118-6</li>
                    <li>STRN Number : 1700401211818</li>
                    <li>Online Shopping App</li>
                    <li>Online Grocery Shopping</li>
                    <li>Daraz Exclusive</li>
                    <li>Hot to Shop on Daraz</li>
                </div>
                <div className="qr">
                    <div className="qrTop">
                        <div className="qr"><img src={qr} alt="" /></div>
                        <div className="shopping">
                            <img src={shopFooterImage} alt="" />
                            <h4 className='happHead'>Happy Shopping</h4>
                            <h4>Download App</h4>
                        </div>
                    </div>
                    <div className="qrBottom">
                        <div className="playImgDiv"><img src={appStore} style={{ width: "100px", height: "50px" }} alt="" /></div>
                        <div className="playImgDiv"><img src={appGoogle} style={{ width: "100px", height: "50px" }} alt="" /></div>
                        <div className="playImgDiv"><img src={appGallery} style={{ width: "100px", height: "30px" }} className="mt-2" alt="" /></div>
                    </div>
                </div>
            </div>



            <div className="f2"></div>


            
        </div>
    )
}

export default Footer
