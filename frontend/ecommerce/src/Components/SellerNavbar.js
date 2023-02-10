import { useState, useEffect } from "react";
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

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Input } from 'antd';
import SendIcon from '@mui/icons-material/Send';





const baseUrl = "http://localhost:4000"

const SellerNavbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLogginedSeller = useSelector(state => state.isSeller)
    const sellerAuthInfo = useSelector(state => state.sellerAuth)
    const { isAuthenticated, sellerAuth, isSeller } = bindActionCreators(actionCreators, dispatch)



    const [open, setOpen] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };

    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
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



    const [allChats, setAllChats] = useState([])
    useEffect(() => {
        const getChats = async () => {
            const response = await axios.get(`${baseUrl}/getChats`)
            const mychats = response.data.filter(item => item.sellerId === sellerAuthInfo._id)
            setAllChats(mychats)
        }
        getChats()
    }, [])


    const [roomId, setRoomId] = useState('')
    const [sended, setSended] = useState('')
    useEffect(() => {
        const getMessages = async () => {
            const response = await axios.get(`${baseUrl}/getMessages/${roomId}`)
            console.log(response)
            setAllMessages(response.data.messages)
        }
        if (roomId !== '') {
            getMessages()
        }
    }, [roomId, sended])



    const [messageScreen, setMessageScreen] = useState(false)
    const [userToMessage, setUserToMessage] = useState({})
    const [authInfo, setAuthInfo] = useState({})
    const showMessageScreen = async (item) => {
        setMessageScreen(true)
        setUserToMessage(item)
        setAuthInfo(item)
        setRoomId(item.userId + item.sellerId)
        const response = await axios.get(`${baseUrl}/getMessages/${authInfo._id + sellerAuthInfo._id}`)
        setAllMessages(response.data.messages)
    }




    const [allMessages, setAllMessages] = useState([])
    const [messageText, setMessageText] = useState('')
    const sendMessage = async () => {
        const response = await axios.post(`${baseUrl}/sendMessage`, {
            text: messageText,
            chatRoomId: roomId,
            sendBy: sellerAuthInfo._id,
            sendTo: authInfo._id
        })
        setMessageText('')
        setAllMessages(response.data.result.messages)

        // for running useEffect again to get message
        setSended("yessss")
    }








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
                    <img src={sellerAuthInfo.shopImageUrl} alt="" />
                    <span className="mx-2 my-2">{sellerAuthInfo.shopName}</span>
                    <Dropdown menu={{ items }} placement="topLeft">
                        <ArrowDropDownCircleIcon className="my-2" style={{ cursor: "pointer", color: "#f85606" }} />
                    </Dropdown>
                </div>
            </Space>





            <Drawer title={"Shopping Store"} width={520} closable={false} onClose={onClose} open={open} placement={'left'}>
                <div className="sellerHomeLinks">
                    <div onClick={() => navigate('/sellerHome')}><Person2Icon className="mx-2" style={{ color: "grey" }} /> Profile</div>
                    <div onClick={() => navigate('/sellerMyProducts')}><InventoryIcon className="mx-2" style={{ color: "grey" }} />My Products</div>
                    <div><DashboardIcon className="mx-2" style={{ color: "grey" }} />Dashboard</div>
                    <div onClick={showChildrenDrawer}><MailIcon className="mx-2" style={{ color: "grey" }} />Inbox </div>
                </div>





                <Drawer

                    width={420}
                    closable={false}
                    onClose={onChildrenDrawerClose}
                    open={childrenDrawer}
                    placement={'left'}
                >
                    <div className="usersScreen">

                        <div className="userItem" style={messageScreen ? { display: "none" } : { display: "block" }}>
                            <h2 style={{ marginLeft: "23px", fontSize: "14px" }}>Messages</h2>
                            {
                                allChats.map((item, index) => {
                                    return <div className="chatBoxItem p-2" key={index} onClick={() => showMessageScreen(item)}>
                                        <div className="profile">
                                            <img src={'https://i.pinimg.com/474x/63/f0/b2/63f0b2df35ea9d8e4571afd7a10eef6f.jpg'} />
                                        </div>
                                        <div className="p-2 sellerName">
                                            {item.userName}
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
                                    <img src="https://i.pinimg.com/474x/63/f0/b2/63f0b2df35ea9d8e4571afd7a10eef6f.jpg" alt="" />
                                </div>
                                <div className="mx-2 mt-2 sellerName">
                                    {userToMessage.userName}
                                </div>
                            </div>

                            <div className="allMsgs">
                                {
                                    allMessages ? allMessages.map((item, index) => {
                                        if (item.msgItem.sendBy === sellerAuthInfo._id) {
                                            return <div key={index} className="currentUserMsg">
                                                {item.msgItem.text}
                                                <span className="time">3:28</span>
                                            </div>
                                        } else {
                                            return <div key={index} className="friendMsg">
                                                {item.msgItem.text}
                                                <span className="time">3:48</span>
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





            </Drawer>











        </>
    );
};


export default SellerNavbar