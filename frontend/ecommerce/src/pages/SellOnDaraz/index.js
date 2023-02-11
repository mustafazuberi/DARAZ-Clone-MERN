import React, { useState,useEffect } from 'react'
import FileBase64 from 'react-file-base64';
import axios from 'axios';

import "./style.css"
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

import { TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const baseUrl = "http://localhost:4000"

const SellOnDaraz = () => {

    const navigate = useNavigate()






    // Protective Routing
    const isLogginedSeller = useSelector(state => state.isSeller)
    const isLoggined = useSelector(state => state.isAuthenticated)
    useEffect(() => {
        if (!isLogginedSeller && !isLoggined) {
            return
        } else {
            navigate('/login')
        }
    }, [])
    ///////////////////////////////











    const citiesArray = ["Islamabad", "Ahmed Nager", "Ahmadpur East", "Ali Khan", "Alipur", "Arifwala", "Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala", "Chillianwala", "Chakwal", "Chichawatni", "Chiniot", "Chishtian", "Daska", "Darya Khan", "Dera Ghazi", "Dhaular", "Dina", "Dinga", "Dipalpur", "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", "Haveli", "Lakha", "Jalalpur", "Jattan", "Jampur", "Jaranwala", "Jhang", "Jhelum", "Kalabagh", "Karor Lal", "Kasur", "Kamalia", "Kamoke", "Khanewal", "Khanpur", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Lalamusa", "Layyah", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "mian Channu", "Mianwali", "Multan", "Murree", "Muridke", "Mianwali Bangla", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Pakpattan", "Pattoki", "Pir Mahal", "Qaimpur", "Qila Didar", "Rabwah", "Raiwind", "Rajanpur", "Rahim Yar", "Rawalpindi", "Sadiqabad", "Safdarabad", "Sahiwal", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Sialkot", "Sohawa", "Soianwala", "Siranwali", "Talagang", "Taxila", "Toba Tek", "Vehari", "Wah Cantonment", "Wazirabad", "Badin", "Bhirkan", "Rajo Khanani", "Chak", "Dadu", "Digri", "Diplo", "Dokri", "Ghotki", "Haala", "Hyderabad", "Islamkot", "Jacobabad", "Jamshoro", "Jungshahi", "Kandhkot", "Kandiaro", "Karachi", "Kashmore", "Keti Bandar", "Khairpur", "Kotri", "Larkana", "Matiari", "Mehar", "Mirpur Khas", "Mithani", "Mithi", "Mehrabpur", "Moro", "Nagarparkar", "Naudero", "Naushahro Feroze", "Naushara", "Nawabshah", "Nazimabad", "Qambar", "Qasimabad", "Ranipur", "Ratodero", "Rohri", "Sakrand", "Sanghar", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar", "Shikarpaur", "Sukkur", "Tangwani", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Thatta", "Umerkot", "Warah", "Abbottabad", "Adezai", "Alpuri", "Akora Khattak", "Ayubia", "Banda Daud", "Bannu", "Batkhela", "Battagram", "Birote", "Chakdara", "Charsadda", "Chitral", "Daggar", "Dargai", "Darya Khan", "dera Ismail", "Doaba", "Dir", "Drosh", "Hangu", "Haripur", "Karak", "Kohat", "Kulachi", "Lakki Marwat", "Latamber", "Madyan", "Mansehra", "Mardan", "Mastuj", "Mingora", "Nowshera", "Paharpur", "Pabbi", "Peshawar", "Saidu Sharif", "Shorkot", "Shewa Adda", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Timergara", "Tordher", "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kacchi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Lehri", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin valley", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat"]
    const categoriesArray = ["Electronics", "Clothing", "Home & Garden", "Sports & Outdoors", "Toys & Games", "Health & Beauty", "Jewelry & Watches", " Automotive", "Books & Movies", "Musical Instruments"]
    let [country, setCountry] = useState("")
    let [city, setCity] = useState("")
    let [category, setCategory] = useState("")
    let [paymentMethod, setPaymentMethod] = useState("")
    const handleChangeCountry = (e) => {
        setCountry(e.target.value)
    }
    const handleChangeCity = (e) => {
        setCity(e.target.value)
    }
    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
    }
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }




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


    const signupAsSeller = async (e) => {
        e.preventDefault()
        if (shopImgUrl.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Sorry, you need to fill all the input fields before submitting. ",
            })
            return
        }
        const imageUrl = await convertToBase64(shopImgUrl)
        const fullName = document.getElementById('fullName').value
        const email = document.getElementById('email').value
        const psw = document.getElementById('psw').value
        const phNumber = document.getElementById('phNumber').value.toString()
        const shopName = document.getElementById('shopName').value

        if (!fullName || !email || !psw || !phNumber || !shopName || !city || !country || !category || !paymentMethod) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Sorry, you need to fill all the input fields before submitting. ",
            })
            return
        } else if (phNumber.length < 11) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please enter a valid phone number with at least 11 digits.",
            })
            return
        }
        try {

            let response = await axios.post(`${baseUrl}/signupAsSeller`, {
                fullName: fullName,
                email: email,
                password: psw,
                phoneNumber: phNumber,
                shopName: shopName,
                city: city,
                country: country,
                productCategory: category,
                paymentMethod: paymentMethod,
                shopImageUrl: imageUrl
            })

            await Swal.fire({
                title: response.data.message,
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(/images/trees.png)',
                backdrop: `
                  #ff54007d
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `
            })
            navigate('/login')
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.response.data.message,
            })
        }

    }

    return (
        <>
            <Navbar />
            <div className="sellHeading">
                <h1>Sell on Pakistan’s #1 Marketplace</h1>
            </div>
            <div className="mainSellOnDarazPage">
                <form method='POST' onSubmit={signupAsSeller}>
                    <div className="mainSellOnDarazFormDiv">
                        <h4 style={{ textAlign: "center", paddingTop: "10px" }}>Welcome, Create Your Online Shopping Store Here!</h4>
                        <div className="sellFormInp">
                            <TextField id='fullName' label="Fullname" placeholder='Enter your first and last name' variant="filled" size='small' style={{ width: "100%" }} />
                        </div>
                        <div className="sellFormInp">
                            <TextField id='email' label="Email" type={'email'} placeholder='Enter your email' variant="filled" size='small' style={{ width: "100%" }} />
                        </div>
                        <div className="sellFormInp">
                            <TextField id='psw' label="Password" type={'password'} placeholder='Enter your Password' variant="filled" size='small' style={{ width: "100%" }} />
                        </div>
                        <div className="sellFormInp">
                            <TextField id='phNumber' label="Phone number" type={'number'} placeholder='Enter your phone number' variant="filled" size='small' style={{ width: "100%" }} />
                        </div>
                        <div className="sellFormInp">
                            <TextField id='shopName' label="Shop Name" placeholder='Enter your shop name' variant="filled" size='small' style={{ width: "100%" }} />
                        </div>
                        {/* selector City*/}
                        <div className="sellFormInp">

                            <FormControl variant="filled" size='small' style={{ width: "100%" }}>
                                <InputLabel >City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="city"
                                    value={city}
                                    name='city'
                                    label="Age"
                                    onChange={handleChangeCity}
                                >
                                    {citiesArray.map((item, index) => {
                                        return <MenuItem key={index} value={item}>{item}</MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                        </div>


                        <div className="sellFormInp">
                            {/* Country */}
                            <FormControl variant="filled" size='small' style={{ width: "100%" }}>
                                <InputLabel >Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="country"
                                    value={country}
                                    name='Country'
                                    label="Country"
                                    onChange={handleChangeCountry}
                                >
                                    <MenuItem value={'Pakistan'}>Pakistan</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="sellFormInp">

                            <FormControl variant="filled" size='small' style={{ width: "100%" }}>
                                <InputLabel >Your Products Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCategory"
                                    value={category}
                                    name='city'
                                    label="Age"
                                    onChange={handleChangeCategory}
                                >
                                    {categoriesArray.map((item, index) => {
                                        return <MenuItem key={index} value={item}>{item}</MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                        </div>

                        <div className="sellFormInp">
                            {/* Country */}
                            <FormControl variant="filled" size='small' style={{ width: "100%" }}>
                                <InputLabel >Payment Method</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="paymentMethod"
                                    value={paymentMethod}
                                    name='Country'
                                    label="Country"
                                    onChange={handlePaymentMethod}
                                >
                                    <MenuItem value={'On Delivery'}>On Delivery</MenuItem>
                                </Select>
                            </FormControl>
                        </div>


                        <div className="sellFormInp">
                            {/* upload image btn */}
                            <span className="uploadImageHeading">Upload your shop Image</span>
                            <input className="form-control" type="file" id="shopImage" onChange={handleImageUpload} />


                        </div>



                        <div className="sellFormInp">
                            <button className="createStore" type='submit'>Create Store</button>
                        </div>





                    </div>
                </form>
            </div>


            <Footer />

        </>
    )
}

export default SellOnDaraz
