import React, { useState } from 'react'

import "./style.css"
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

import { TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material'


const SellOnDaraz = () => {

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

    return (
        <>
            <Navbar />
            <div className="sellHeading">
                <h1>Sell on Pakistan’s #1 Marketplace</h1>
            </div>
            <div className="mainSellOnDarazPage">
                <div className="mainSellOnDarazFormDiv">
                    <h4 style={{textAlign:"center",paddingTop:"10px"}}>Welcome, Create Your Online Shopping Store Here!</h4>
                    <div className="sellFormInp">
                        <TextField id="psw" label="Fullname" placeholder='Enter your first and last name' variant="filled" size='small' style={{ width: "100%" }} />
                    </div>
                    <div className="sellFormInp">
                        <TextField id="psw" label="Email" type={'email'} placeholder='Enter your email' variant="filled" size='small' style={{ width: "100%" }} />
                    </div>
                    <div className="sellFormInp">
                        <TextField id="psw" label="Password" type={'password'} placeholder='Enter your Password' variant="filled" size='small' style={{ width: "100%" }} />
                    </div>
                    <div className="sellFormInp">
                        <TextField id="psw" label="Phone number" type={'number'} placeholder='Enter your phone number' variant="filled" size='small' style={{ width: "100%" }} />
                    </div>
                    <div className="sellFormInp">
                        <TextField id="psw" label="Shop Name" placeholder='Enter your shop name' variant="filled" size='small' style={{ width: "100%" }} />
                    </div>
                    {/* selector City*/}
                    <div className="sellFormInp">

                        <FormControl variant="filled" size='small' style={{ width: "100%" }}>
                            <InputLabel >City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="restCity"
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
                                id="restCountry"
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
                                id="restCity"
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
                                id="restCountry"
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
                        <input className="form-control" type="file" id="restImage" />

                    </div>



                    <div className="sellFormInp">
                        <button className="createStore">Create Store</button>
                    </div>





                </div>
            </div>


            <Footer />

        </>
    )
}

export default SellOnDaraz
