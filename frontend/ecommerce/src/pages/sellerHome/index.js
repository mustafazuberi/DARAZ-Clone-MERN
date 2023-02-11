import { useEffect, useState } from "react";
import './style.css'
import axios from "axios";
import swal from "sweetalert";

import SellerNavbar from "../../Components/SellerNavbar";

import { useSelector } from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import GroupsIcon from '@mui/icons-material/Groups';
import { Button } from "antd";
import { TextField, FormControl, Select, MenuItem, InputLabel } from "@mui/material";

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../../store/index"




const baseUrl = "http://localhost:4000"
const SellerHome = () => {


    const authInfo = useSelector(state => state.authData)
    const [userOrders, setuserOrders] = useState([])
    useEffect(() => {
        const getMyOrders = async () => {
            const response = await axios.get(`${baseUrl}/getOrders/${authInfo._id}`)
            setuserOrders(response.data)
        }
        getMyOrders()
    }, [])






    const dispatch = useDispatch()
    const { sellerAuth } = bindActionCreators(actionCreators, dispatch)

    const sellerAuthInfo = useSelector(state => state.sellerAuth)


    const [storeFollowers, setStoreFollowers] = useState(0)
    const [products, setProducts] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0);


        const sellerMyData = async () => {
            try {
                const responseStore = await axios.get(`${baseUrl}/detailPageSeller/${sellerAuthInfo._id}`)
                setStoreFollowers(responseStore.data.followers)

            } catch (e) {
                console.log(e)
            }
        }
        sellerMyData()

        const getProducts = async () => {
            const response = await axios.get(`${baseUrl}/getSellerProducts/${sellerAuthInfo._id}`)
            console.log('products', response)
            setProducts(response.data)
        }
        getProducts()



    }, [])







    const citiesArray = ["Islamabad", "Ahmed Nager", "Ahmadpur East", "Ali Khan", "Alipur", "Arifwala", "Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala", "Chillianwala", "Chakwal", "Chichawatni", "Chiniot", "Chishtian", "Daska", "Darya Khan", "Dera Ghazi", "Dhaular", "Dina", "Dinga", "Dipalpur", "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", "Haveli", "Lakha", "Jalalpur", "Jattan", "Jampur", "Jaranwala", "Jhang", "Jhelum", "Kalabagh", "Karor Lal", "Kasur", "Kamalia", "Kamoke", "Khanewal", "Khanpur", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Lalamusa", "Layyah", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "mian Channu", "Mianwali", "Multan", "Murree", "Muridke", "Mianwali Bangla", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Pakpattan", "Pattoki", "Pir Mahal", "Qaimpur", "Qila Didar", "Rabwah", "Raiwind", "Rajanpur", "Rahim Yar", "Rawalpindi", "Sadiqabad", "Safdarabad", "Sahiwal", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Sialkot", "Sohawa", "Soianwala", "Siranwali", "Talagang", "Taxila", "Toba Tek", "Vehari", "Wah Cantonment", "Wazirabad", "Badin", "Bhirkan", "Rajo Khanani", "Chak", "Dadu", "Digri", "Diplo", "Dokri", "Ghotki", "Haala", "Hyderabad", "Islamkot", "Jacobabad", "Jamshoro", "Jungshahi", "Kandhkot", "Kandiaro", "Karachi", "Kashmore", "Keti Bandar", "Khairpur", "Kotri", "Larkana", "Matiari", "Mehar", "Mirpur Khas", "Mithani", "Mithi", "Mehrabpur", "Moro", "Nagarparkar", "Naudero", "Naushahro Feroze", "Naushara", "Nawabshah", "Nazimabad", "Qambar", "Qasimabad", "Ranipur", "Ratodero", "Rohri", "Sakrand", "Sanghar", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar", "Shikarpaur", "Sukkur", "Tangwani", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Thatta", "Umerkot", "Warah", "Abbottabad", "Adezai", "Alpuri", "Akora Khattak", "Ayubia", "Banda Daud", "Bannu", "Batkhela", "Battagram", "Birote", "Chakdara", "Charsadda", "Chitral", "Daggar", "Dargai", "Darya Khan", "dera Ismail", "Doaba", "Dir", "Drosh", "Hangu", "Haripur", "Karak", "Kohat", "Kulachi", "Lakki Marwat", "Latamber", "Madyan", "Mansehra", "Mardan", "Mastuj", "Mingora", "Nowshera", "Paharpur", "Pabbi", "Peshawar", "Saidu Sharif", "Shorkot", "Shewa Adda", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Timergara", "Tordher", "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kacchi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Lehri", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin valley", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat"]
    const categoriesArray = ["Electronics", "Clothing", "Home & Garden", "Sports & Outdoors", "Toys & Games", "Health & Beauty", "Jewelry & Watches", " Automotive", "Books & Movies", "Musical Instruments"]
    let [city, setCity] = useState(sellerAuthInfo.city)
    let [category, setCategory] = useState(sellerAuthInfo.productCategory)
    let [storeName, setStoreName] = useState(sellerAuthInfo.shopName)
    let [storePhoneNumber, setStorePhoneNumber] = useState(sellerAuthInfo.phoneNumber)

    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleChangeCity = (e) => {
        setCity(e.target.value)
    }


    const [shopImgUrl, setShopImgUrl] = useState(sellerAuthInfo.shopImageUrl)
    const handleImageUpload = async (e) => {
        let convertedUrl = await convertToBase64(e.target.files[0])
        setShopImgUrl(convertedUrl)
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








    const updateShopInfo = async () => {
        try {
            const response = await axios.post(`${baseUrl}/updateShopInfo/${sellerAuthInfo._id}`, {
                shopName: storeName,
                phoneNumber: storePhoneNumber,
                city: city,
                productCategory: category,
                shopImageUrl: shopImgUrl,
            })
            const responseSeller = await axios.get(`${baseUrl}/detailPageSeller/${sellerAuthInfo._id}`)
            sellerAuth(responseSeller.data)
            swal(response.data.message)


        } catch (e) {
            console.log(e)
        }
    }


    const [userOrdersQty, setuserOrdersQty] = useState([])
    useEffect(() => {
        const getMyOrders = async () => {
            const response = await axios.get(`${baseUrl}/getOrdersOnSellerPortal/${sellerAuthInfo._id}`)
            setuserOrdersQty(response.data)
        }
        getMyOrders()
    }, [])




    return (
        <>
            <SellerNavbar />

            <div className="overviewProfile">

                <div className="overviewDiv orders">
                    <div className="content">
                        <h4>{userOrdersQty.length}</h4>
                        <span>Orders</span>

                    </div>
                    <div className="icon">
                        <ShoppingCartIcon style={{ fontSize: "55px" }} />
                    </div>
                </div>

                <div className="overviewDiv products">
                    <div className="content">
                        <h4>{products.length}</h4>
                        <span>Products</span>

                    </div>
                    <div className="icon">
                        <ShoppingBasketIcon style={{ fontSize: "55px" }} />
                    </div>
                </div>

                <div className="overviewDiv followers">
                    <div className="content">
                        <h4>{storeFollowers.length}</h4>
                        <span>Followers</span>

                    </div>
                    <div className="icon">
                        <GroupsIcon style={{ fontSize: "55px" }} />
                    </div>
                </div>


            </div>



            <div className="latest">
                <div className="latestOrders">
                    <div className="heading">
                        <h4>Latest Orders</h4>
                    </div>
                    <div className="headingsRow">
                        <div>Order</div>
                        <div>Status</div>
                        <div>Total</div>
                        <div>Date</div>
                        <div>Details</div>
                    </div>
                    <div className="productItemsLatest">
                        <br /><br />
                    </div>
                    <div className="viewAll">
                        <Button variant="outlined">View All</Button>
                    </div>

                </div>


                <div className="latestproducts">
                    <div className="heading">
                        <h4>Latest Orders</h4>
                    </div>
                    <div className="headingsRow">
                        <div>Order</div>
                        <div>Status</div>
                        <div>Total</div>
                        <div>Date</div>
                        <div>Details</div>
                    </div>
                    <div className="productItemsLatest">
                        <br /><br />
                    </div>
                    <div className="viewAll">
                        <Button variant="outlined">View All</Button>
                    </div>
                </div>

            </div>



            <h2 className="updateInfoHeading">Update your shop info here!</h2>
            <div className="updateDiv">
                <TextField id="standard-basic" label="Store Name" onChange={(e) => setStoreName(e.target.value)} value={storeName} className="updateInps" variant="standard" />
            </div>
            <div className="updateDiv">
                <TextField id="standard-basic" label="Phone Number" onChange={(e) => setStorePhoneNumber(e.target.value)} value={storePhoneNumber} type={'number'} className="updateInps" variant="standard" />
            </div>
            <div className="updateDiv">
                <FormControl variant="standard" size='small' style={{ width: "100%" }}>
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



            <div className="updateDiv">
                <FormControl variant="standard" size='small' style={{ width: "100%" }}>
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

            <div className="imageDiv">
                <div className="imageDiv">
                    <img src={sellerAuthInfo.shopImageUrl} alt="" />
                </div>
                <br />
                <span className="uploadImageHeading">Upload your shop Image</span>
                <input className="form-control" type="file" id="shopImage" onChange={handleImageUpload} />
                <br />
            </div>


            <button className="updateStoreInfo" onClick={updateShopInfo}>Update Info</button>
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />






        </>
    );
};


export default SellerHome
