import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import "./login.css"

import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2';


import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../../store/index"
import { useSelector } from 'react-redux'





const baseUrl = "http://localhost:4000"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { authData, isAuthenticated, sellerAuth, isSeller } = bindActionCreators(actionCreators, dispatch)





    // Protective Routing
    const isLogginedSeller = useSelector(state => state.isSeller)
    const isLoggined = useSelector(state => state.isAuthenticated)
    useEffect(() => {
        if (!isLogginedSeller && !isLoggined) {
            return
        } else {
            navigate('/')
        }
    }, [])
    ///////////////////////////////






    const login = async (e) => {
        e.preventDefault()
        const email = document.getElementById("loginEmail").value
        const password = document.getElementById("password").value
        try {

            let response = await axios.post(`${baseUrl}/login`, {
                email: email,
                password: password,
            })
            // authData(response.data.profile)
            isAuthenticated(true)
            response.data.whereToNavigate === '/sellerHome' ? isSeller(true) : isSeller(false)
            response.data.whereToNavigate === '/sellerHome' ? sellerAuth(response.data.profile) : authData(response.data.profile)
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
                  no-repeat
                `
            })
            console.log(response)
            navigate(response.data.whereToNavigate)
        } catch (e) {
            let response = await axios.post(`${baseUrl}/login`, {
                email: email,
                password: password,
            })
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message,
            })
        }
    }


    return (

        <div>
            <Navbar />

            <div className="mainLoginDiv">
                <div className="login">
                    <div className="welcome">
                        <h1>Welcome to Daraz! Please login.</h1>
                    </div>
                    <div className="loginFormDiv">
                        <form method='POST' onSubmit={login}>
                            <div className="loginForm">
                                <div className="inpsSide">
                                    <div className="loginFormInp">
                                        <TextField id="loginEmail" name='email' label="Email" variant="filled" size='small' style={{ width: "100%" }} />
                                    </div>
                                    <div className="loginFormInp">
                                        <TextField id="password" name='password' type={'password'} label="Password" variant="filled" size='small' style={{ width: "100%" }} />
                                    </div>
                                </div>
                                <div className="btnsSide">
                                    <button type="submit" className='loginBtn'>Login</button><br /><br />
                                    <span className="orLogin">Dont have an account?</span><br />
                                    <button className='loginBtn signupBtn' onClick={() => navigate('/signup')}>Signup</button>


                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
            <Footer />

        </div>
    )
}

export default Login
