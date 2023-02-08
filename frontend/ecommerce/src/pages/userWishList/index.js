import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import "./style.css"
import Footer from '../../Components/Footer'

import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ChakraProvider } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../../store/index"
import swal from 'sweetalert'
import axios from 'axios'





const baseUrl = "http://localhost:4000"

const UserWishList = () => {

    const navigate = useNavigate()
    const authInfo = useSelector(state => state.authData)
    const dispatch = useDispatch()
    const { authData } = bindActionCreators(actionCreators, dispatch)
    let [updated, setUpdated] = useState('')



    useEffect(() => {

        const getUserData = async () => {
            const userData = await axios.get(`${baseUrl}/getUserData/${authInfo._id}`)
            authData(userData.data)
            console.log(userData)
        }
        getUserData()

    }, [updated])

    const deleteProduct = async (e) => {
        const updatedArray = authInfo.wishlist.filter(item => item.item._id !== e)
        // sending Data in DB
        const response = await axios.post(`${baseUrl}/updateWishList/${authInfo._id}`, {
            wishlist: updatedArray
        })
        swal(response.data.message)
        setUpdated("yes")
    }



    return (

        <>
            <Navbar />


            <h1 className='wishListHead'>My Wishlist</h1>
            <div className="wishListAndFollowedStores">
                <ChakraProvider>
                    {
                        authInfo.wishlist.length !==0 ? authInfo.wishlist.map((item, index) => {
                            return <div key={index} className="WishItem" >
                                <Card
                                    direction={{ base: 'column', sm: 'row' }}
                                    overflow='hidden'
                                    variant='outline'
                                >
                                    <Image
                                        objectFit='cover'
                                        maxW={{ base: '100%', sm: '200px' }}
                                        src={item.item.productImage}
                                        alt='Caffe Latte'

                                    />

                                    <Stack>
                                        <CardBody>
                                            <Heading size='md'>{item.item.productName}</Heading>
                                            <Heading size='md' className='mt-2'>{item.item.productPrice} PKR</Heading>

                                            <Text py='2'>
                                                {item.item.productDescription}
                                            </Text>
                                        </CardBody>

                                        <CardFooter>
                                            <Button variant='solid' className='mx-3' colorScheme='blue' onClick={() => navigate(`/productDetails/${item.item._id}`)}>
                                                View Details
                                            </Button>

                                            <Button colorScheme='gray' onClick={() => deleteProduct(item.item._id)}><DeleteIcon /> delete</Button>

                                        </CardFooter>
                                    </Stack>
                                </Card>

                            </div>
                        }) : <h1 className='noItemsAddedHead'>No Items Added</h1>
                    }
                </ChakraProvider>
            </div>



            <Footer />
        </>
    )
}

export default UserWishList
