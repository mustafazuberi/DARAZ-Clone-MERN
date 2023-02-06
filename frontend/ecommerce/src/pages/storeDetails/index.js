import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import { useParams } from 'react-router-dom'
import axios from 'axios'




const baseUrl = "http://localhost:4000"
const Index = () => {

    const storeId = useParams().id
    console.log(storeId)



    useEffect(() => {

        const getStoreDetails = async () => {
            const response = await axios.get(`${baseUrl}/detailPageSeller/${storeId}`)
            console.log(response.data)

        }
        getStoreDetails()


    }, [])





    return (
        <>
            <Navbar />

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <Footer />
        </>
    )
}

export default Index
