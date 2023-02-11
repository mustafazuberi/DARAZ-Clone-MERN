// import React from 'react'    
import * as React from 'react'
import { useState, useEffect } from 'react'
import swal from 'sweetalert';
import './style.css'
import SellerNavbar from '../../Components/SellerNavbar'
import { useSelector } from 'react-redux'
import axios from 'axios'



import {
    useDisclosure, Button, DrawerOverlay, Drawer, DrawerCloseButton, DrawerContent, DrawerBody, Stack, Box, InputLeftAddon,
    InputRightAddon, Input, InputGroup, FormLabel, DrawerHeader, Select, DrawerFooter, Textarea,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon, } from '@chakra-ui/icons'
import { ChakraProvider } from '@chakra-ui/react';


// imports for card component
import Card from 'antd/es/card/Card';
import Meta from 'antd/es/card/Meta';
import Avatar from 'antd/es/avatar/avatar';
import { useNavigate } from 'react-router-dom';







const baseUrl = "http://localhost:4000"

const MyProducts = () => {
    const sellerAuth = useSelector(state => state.sellerAuth)
    const navigate = useNavigate()






    // Protective Routing
    const isLogginedSeller = useSelector(state => state.isSeller)
    const isLoggined = useSelector(state => state.isAuthenticated)
    useEffect(() => {
        if (isLogginedSeller) {
            return
        } else {
            navigate('/login')
        }
    }, [])
    ///////////////////////////////








    const categoriesArray = ["Electronics", "Clothing", "Home & Garden", "Sports & Outdoors", "Toys & Games", "Health & Beauty", "Jewelry & Watches", " Automotive", "Books & Movies", "Musical Instruments"]
    const { isOpen, onOpen, onClose } = useDisclosure()


    const firstField = React.useRef()






    const convertToBase64 = (url) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(url)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }





    const [productCategory, setProductCategory] = useState('')
    const [shopImgUrl, setShopImgUrl] = useState('')
    const handleImageUpload = (e) => {
        setShopImgUrl(e.target.files[0])
    }
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [productShippingCost, setProductShippingCost] = useState('')
    const [productImage, setProductImage] = useState('')
    const [createdOn, setCreatedOn] = useState('')



    const openForAddingProduct = () => {
        setProductToUpdateId(false)
        onOpen()
    }
    const [added, setAdded] = useState('')
    const addProduct = async () => {
        if (shopImgUrl.length === 0) {
            swal("Sorry, you need to fill all the input fields before submitting.")
            return
        }
        const productImage = await convertToBase64(shopImgUrl)

        if (!productName || !productDescription || !productCategory || !productPrice || !productQuantity
            || !productShippingCost || !productImage) {
            swal("Sorry, you need to fill all the input fields before submitting.")
            return
        }
        // console.log(productName, productCategory, productDescription, productPrice, productQuantity, productShippingCost, productImage)
        try {
            let response = await axios.post(`${baseUrl}/addProduct`, {
                _id: sellerAuth._id,
                productName: productName,
                productCategory: productCategory,
                productDescription: productDescription,
                productPrice: productPrice,
                productQuantity: productQuantity,
                productShippingCost: productShippingCost,
                productImage: productImage,
            })
            await swal(response.data.message)
            setAdded("added")
            onClose()


        } catch (e) {
            console.log(e.message)
        }

    }






    const [productToUpdateId, setProductToUpdateId] = useState('')
    const [productImageUpdate, setProductImageUpdate] = useState('')
    const openDrawerOnUpdate = (item) => {
        onOpen()
        setProductToUpdateId(item._id)
        setProductName(item.productName)
        setCreatedOn(item.createdOn)
        setProductCategory(item.productCategory)
        setProductDescription(item.productDescription)
        setProductName(item.productName)
        setProductPrice(item.productPrice)
        setProductQuantity(item.productQuantity)
        setProductShippingCost(item.productShippingCost)
        setProductImageUpdate(item.productImage)

    }
    const updateProduct = async () => {
        if (!productName || !productDescription || !productCategory || !productPrice || !productQuantity
            || !productShippingCost) {
            swal("Sorry, you need to fill all the input fields before submitting.")
            return
        }
        try {
            console.log(productToUpdateId)
            let response = await axios.post(`${baseUrl}/updateProduct/${productToUpdateId}`, {
                _id: productToUpdateId,
                sellerId: sellerAuth._id,
                productName: productName,
                productCategory: productCategory,
                productDescription: productDescription,
                productPrice: productPrice,
                productQuantity: productQuantity,
                productShippingCost: productShippingCost,
                productImage: productImageUpdate,
            })
            swal(response.data.message)
            setAdded("added")
            onClose()

        } catch (e) {
            console.log(e)
        }
    }






    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`${baseUrl}/deleteProduct/${productId}`)
            swal(response.data.message)
            setAdded("added")
        } catch (e) {
            console.log(e)
        }
    }

















    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            const response = await axios.get(`${baseUrl}/getSellerProducts/${sellerAuth._id}`)
            console.log('products', response)
            setProducts(response.data)
        }
        getProducts()

    }, [added])
    console.log(products)



    return (
        <>
            <SellerNavbar />

            <h1 className='productsHeading'>Products</h1>


            <div className="chakraDrawer">
                <ChakraProvider>
                    <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={openForAddingProduct}>
                        Add New Product
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        initialFocusRef={firstField}
                        onClose={onClose}
                        size="480px"
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader borderBottomWidth='1px'>
                                Add new product in your shopping store
                            </DrawerHeader>

                            <DrawerBody>
                                <Stack spacing='24px'>
                                    <Box>
                                        <FormLabel htmlFor='ProductName'>Product Name</FormLabel>
                                        <Input
                                            // ref={firstField}/
                                            onChange={(e) => setProductName(e.target.value)}
                                            id='productName'
                                            value={productName}
                                            placeholder='Please enter product name'
                                        />
                                    </Box>



                                    <Box>
                                        <FormLabel htmlFor='category'>Select Product Category</FormLabel>
                                        <Select id='productCategory' defaultValue='segun' onChange={(e) => setProductCategory(e.target.value)} >
                                            {categoriesArray.map((item, index) => {
                                                return <option key={index} value={item}>{item}</option>
                                            })}
                                        </Select>
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor='desc'>Product Description</FormLabel>
                                        <Textarea id='productDescription' value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor='productPrice'>Product Price in PKR</FormLabel>
                                        <Input
                                            id='productPrice'
                                            placeholder='Please enter product price (PKR)'
                                            type={'number'}
                                            value={productPrice}
                                            onChange={(e) => setProductPrice(e.target.value)}
                                        />
                                    </Box>
                                    <Box>
                                        <FormLabel htmlFor='productQuantity'>Product Stock Quantity </FormLabel>
                                        <Input
                                            id='productQuantity'
                                            placeholder='Please enter product quantity '
                                            type={'number'}
                                            value={productQuantity}
                                            onChange={(e) => setProductQuantity(e.target.value)}
                                        />
                                    </Box>
                                    <Box>
                                        <FormLabel htmlFor='productShippingCost'>Product Shipping Cost in PKR</FormLabel>
                                        <Input
                                            id='productShippingCost'
                                            placeholder='Please enter product shipping cost (PKR) '
                                            type={'number'}
                                            onChange={(e) => setProductShippingCost(e.target.value)}
                                            value={productShippingCost}

                                        />
                                    </Box>
                                    <Box className={productToUpdateId ? 'd-none' : ""}>

                                        <FormLabel htmlFor='productImage'>Upload your product Image</FormLabel>

                                        <input className="form-control" onChange={handleImageUpload} id='productImage' type="file" />
                                    </Box>

                                </Stack>
                            </DrawerBody>

                            <DrawerFooter borderTopWidth='1px'>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='blue' className={productToUpdateId ? 'd-none' : ""} onClick={addProduct}>Submit</Button>
                                <Button colorScheme='blue' className={productToUpdateId ? '' : "d-none"} onClick={updateProduct}>Update</Button>

                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </ChakraProvider>
            </div>



            <div className="allMyProducts">
                {
                    products.map((item, index) => {
                        return <div className="productItem" key={index}>
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src={item.productImage}
                                        style={{ width: "100%", height: "210px" }}
                                    />
                                }
                                actions={[
                                    <Button leftIcon={<EditIcon />} onClick={() => openDrawerOnUpdate(item)} >Edit</Button>,
                                    <Button leftIcon={<DeleteIcon />} onClick={() => deleteProduct(item._id)} >Delete</Button>
                                ]}
                            >
                                <div className="itemDetailText">
                                    <Meta
                                        title={item.productName}
                                        description={item.productDescription}
                                    />
                                    <Meta
                                        title={`Rs ${item.productPrice}`}
                                        description={item.productCategory}
                                    />
                                </div>

                            </Card>
                        </div>

                    })
                }
            </div>





        </>
    )
}

export default MyProducts
