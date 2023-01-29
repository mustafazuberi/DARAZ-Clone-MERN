import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import "./style.css"

import { useNavigate } from 'react-router-dom'

import { TextField } from '@mui/material'
const Login = () => {
    const navigate = useNavigate()
    return (

        <div>
            <Navbar />

            <div className="mainLoginDiv">
                <div className="login">
                    <div className="welcome">
                        <h1>Welcome to Daraz! Please login.</h1>
                    </div>
                    <div className="loginFormDiv">
                        <form action="">
                            <div className="loginForm">
                                <div className="inpsSide">
                                    <div className="loginFormInp">
                                        <TextField id="email" label="Email" variant="filled" size='small' style={{ width: "100%" }} />
                                    </div>
                                    <div className="loginFormInp">
                                        <TextField id="psw" label="Password" variant="filled" size='small' style={{ width: "100%" }} />
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
