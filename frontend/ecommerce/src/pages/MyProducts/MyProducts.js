// import React from 'react'    
import * as React from 'react'
import { useState } from 'react'
import swal from 'sweetalert';
import './style.css'
import SellerNavbar from '../../Components/SellerNavbar'
import { useSelector } from 'react-redux'
import axios from 'axios'



import {
    useDisclosure, Button, DrawerOverlay, Drawer, DrawerCloseButton, DrawerContent, DrawerBody, Stack, Box, InputLeftAddon,
    InputRightAddon, Input, InputGroup, FormLabel, DrawerHeader, Select, DrawerFooter, Textarea
} from '@chakra-ui/react'
import { AddIcon, } from '@chakra-ui/icons'
import { ChakraProvider } from '@chakra-ui/react';




const baseUrl = "http://localhost:4000"

const MyProducts = () => {
    const sellerAuth = useSelector(state => state.sellerAuth)

    const categoriesArray = ["Electronics", "Clothing", "Home & Garden", "Sports & Outdoors", "Toys & Games", "Health & Beauty", "Jewelry & Watches", " Automotive", "Books & Movies", "Musical Instruments"]
    const { isOpen, onOpen, onClose } = useDisclosure()


    const firstField = React.useRef()


    const [productCategory, setProductCategory] = useState('')

    const [shopImgUrl, setShopImgUrl] = useState('')
    const handleImageUpload = (e) => {
        setShopImgUrl(e.target.files[0])
    }




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


    const addProduct = async () => {
        if (shopImgUrl.length === 0) {
            swal("Sorry, you need to fill all the input fields before submitting.")
            return
        }
        const productName = document.getElementById("productName").value
        const productDescription = document.getElementById("productDescription").value
        const productPrice = document.getElementById("productPrice").value
        const productQuantity = document.getElementById("productQuantity").value
        const productShippingCost = document.getElementById("productShippingCost").value
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
            onClose()


        } catch (error) {

        }

    }




    return (
        <>
            <SellerNavbar />

            <h1 className='productsHeading'>Products</h1>


            <div className="chakraDrawer">
                <ChakraProvider>
                    <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen}>
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
                                            id='productName'
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
                                        <Textarea id='productDescription' />
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor='productPrice'>Product Price in PKR</FormLabel>
                                        <Input
                                            id='productPrice'
                                            placeholder='Please enter product price (PKR)'
                                            type={'number'}
                                        />
                                    </Box>
                                    <Box>
                                        <FormLabel htmlFor='productQuantity'>Product Stock Quantity </FormLabel>
                                        <Input
                                            id='productQuantity'
                                            placeholder='Please enter product quantity '
                                            type={'number'}
                                        />
                                    </Box>
                                    <Box>
                                        <FormLabel htmlFor='productShippingCost'>Product Shipping Cost in PKR</FormLabel>
                                        <Input
                                            id='productShippingCost'
                                            placeholder='Please enter product shipping cost (PKR) '
                                            type={'number'}
                                        />
                                    </Box>
                                    <Box>

                                        <FormLabel htmlFor='productImage'>Upload your product Image</FormLabel>

                                        <input className="form-control" onChange={handleImageUpload} id='productImage' type="file" />
                                    </Box>

                                </Stack>
                            </DrawerBody>

                            <DrawerFooter borderTopWidth='1px'>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='blue' onClick={addProduct}>Submit</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </ChakraProvider>


            </div>


        </>
    )
}

export default MyProducts
