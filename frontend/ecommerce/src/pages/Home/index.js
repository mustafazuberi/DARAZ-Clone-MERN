import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import { Button } from 'antd';

import "./style.css"

import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'






const baseUrl = "http://localhost:4000"
const Home = () => {
    const navigate = useNavigate()

    const [allProducts, setAllProducts] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0);

        const getAllProducts = async () => {
            const response = await axios.get(`${baseUrl}/getAllProducts`)
            console.log(response.data)
            setAllProducts(response.data)
        }
        getAllProducts()

    }, [])






    // For Antd drawer
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState('large');
    const showLargeDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };







    return (
        <>
            <Navbar />
            <div className="bgDiv"></div>




            <div className="allProducts">
                {
                    allProducts.map((item, index) => {
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









            <br /><br />
            <button className="loadMore">LOAD MORE</button>

            <Footer />
        </>
    )
}

export default Home


