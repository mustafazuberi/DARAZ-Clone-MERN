import React, { useEffect, useState } from 'react'
import "./style.css"
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import GroupIcon from '@mui/icons-material/Group';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import { useSelector } from 'react-redux'

import swal from 'sweetalert'




const baseUrl = "http://localhost:4000"
const Index = () => {

    const navigate = useNavigate()
    const storeId = useParams().id
    console.log(storeId)

    const [added, setAdded] = useState(0)
    const authInfo = useSelector(state => state.authData)




    const [storeData, setStoreData] = useState('')
    const [sellerProducts, setSellerProducts] = useState([])
    const [storeFollowers, setStoreFollowers] = useState([])

    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);


        const getStoreDetails = async () => {
            const response = await axios.get(`${baseUrl}/detailPageSeller/${storeId}`)
            console.log(response.data)
            setStoreData(response.data)
            setStoreFollowers(response.data.followers)

            console.log("isFollowing", isFollowing)
            response.data.followers.forEach((item) => {
                if (item.cutomerId === authInfo._id) {
                    setIsFollowing(true)
                }
            })

            const responseProducts = await axios.get(`${baseUrl}/getSellerProducts/${storeId}`)
            setSellerProducts(responseProducts.data)
        }
        getStoreDetails()


    }, [])







    console.log(authInfo._id)
    const followStore = async () => {
        let response = await axios.post(`${baseUrl}/followStore/${storeData._id}`, {
            customerId: authInfo._id
        })
        swal(response.data.message)
        setAdded("added!")
    }



    console.log(storeData.shopImageUrl)
    return (
        <>
            <Navbar />

            <div className="shopBg" style={{ backgroundImage: `url(${storeData.shopImageUrl})` }}>
                <div className="mainFollowerDiv">
                    <div className="followIcon">
                        <GroupIcon style={{ fontSize: "35px" }} className='mainFollowerDivIcon' />
                    </div>
                    <div className="qtyFollowers">
                        {storeFollowers ? storeFollowers.length : 0} followers
                    </div>
                    <div className="chatNow">
                        <ChatBubbleIcon className='mainFollowerDivIcon' /> <br /> Chat now
                    </div>
                    <Button className="follow" disabled={isFollowing ? true : false} onClick={followStore} >
                        <PersonAddIcon className='mainFollowerDivIcon' /> <br /> {isFollowing ? 'Following' : 'Follow'}
                    </Button>

                </div>
            </div>

            <div className="shopHeadingDiv">
                <h1 className='shopHeading'>{storeData.shopName}</h1>
            </div>
            <h2 className='allProdHeading'>All Products</h2>


            <div className="allProductsDiv ">
                {
                    sellerProducts.map((item, index) => {
                        return <div className="productItem" key={index}>
                            <Card sx={{ width: 250, maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image={item.productImage}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.productName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.productDescription.slice(0, 25)}
                                    </Typography>
                                    <Typography style={{ fontSize: "17px", color: '#f85606', fontFamily: "fantasy" }} >
                                        {item.productPrice} PKR
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <div className="btns">
                                        <Button type="primary" onClick={() => navigate(`/productDetails/${item._id}`)} style={{ color: "#f85606", backgroundColor: "#ececec" }} block>
                                            View Details
                                        </Button>
                                    </div>
                                </CardActions>
                            </Card>
                        </div>
                    })
                }
            </div>









            <Footer />
        </>
    )
}

export default Index
