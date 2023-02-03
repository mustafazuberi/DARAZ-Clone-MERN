import { useState } from "react";
import './style.css'

import { Space, Drawer } from "antd";
import MenuIcon from '@mui/icons-material/Menu';
import Person2Icon from '@mui/icons-material/Person2';
import MailIcon from '@mui/icons-material/Mail';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Dropdown } from 'antd';

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../store/index"
import axios from "axios";







const baseUrl = "http://localhost:4000"

const SellerNavbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLogginedSeller = useSelector(state => state.isSeller)
    const sellerAuthInfo = useSelector(state => state.sellerAuth)
    console.log(sellerAuthInfo)
    const { isAuthenticated, sellerAuth, isSeller } = bindActionCreators(actionCreators, dispatch)



    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onChange = (e) => {
        setPlacement(e.target.value);
    };


    const logout = async () => {
        try {
            let response = await axios.post(`${baseUrl}/logout`)
            sellerAuth({})
            isAuthenticated(false)
            isSeller(false)
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






    const items = [
        {
            key: '1',
            label: (
                <a style={{ textDecoration: "none" }} onClick={logout}>
                    <LogoutIcon style={{ color: "grey" }} /> Logout

                </a>
            ),
        },
    ]







    return (
        <>
            <Space className="nav">
                <div className='hamburgerIcon'>
                    <MenuIcon onClick={showDrawer} style={{ cursor: "pointer" }} />
                </div>
                <div className='headingPortal mx-4'>
                    <h1 style={{ fontSize: "36px" }}>Seller Portal!</h1>
                </div>





                <div className="profileIconDiv">
                    <img src={sellerAuth.shopImageUrl} alt="" />
                    <span className="mx-2 my-2">{sellerAuthInfo.shopName}</span>
                    <Dropdown menu={{ items }} placement="topLeft">
                        <ArrowDropDownCircleIcon className="my-2" style={{ cursor: "pointer", color: "#f85606" }} />
                    </Dropdown>
                </div>
            </Space>
            <Drawer
                // title={sellerAuth.shopName}
                title={"Shopping Store"}
                placement={placement}
                closable={false}
                onClose={onClose}
                open={open}
                key={placement}
            >
                <div className="sellerHomeLinks">
                    <div onClick={() => navigate('/sellerHome')}><Person2Icon className="mx-2" style={{ color: "grey" }} /> Profile</div>
                    <div onClick={() => navigate('/sellerMyProducts')}><InventoryIcon className="mx-2" style={{ color: "grey" }} />My Products</div>
                    <div><DashboardIcon className="mx-2" style={{ color: "grey" }} />Dashboard</div>
                    <div><MailIcon className="mx-2" style={{ color: "grey" }} />Inbox</div>
                </div>
            </Drawer>
        </>
    );
};


export default SellerNavbar