import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import "./signup.css"

import { useNavigate } from 'react-router-dom'

import { TextField } from '@mui/material'


const Signup = () => {
    const navigate = useNavigate()
    return (

        <div>
            <Navbar />

            <div className="mainSignupDiv">
                <div className="login">
                    <div className="welcome">
                        <h1>Create your Daraz Account.</h1>
                    </div>
                    <div className="loginFormDiv">
                        <form action="">
                            <div className="loginForm">
                                <div className="inpsSide">
                                    <div className="loginFormInp">
                                        <TextField id="email" label="Email" placeholder='Please enter your email' variant="filled" size='small' style={{ width: "100%" }} />
                                    </div>
                                    <div className="loginFormInp">
                                        <TextField id="psw" label="Password" placeholder='Minimum 6 characteters with a number and a letter' variant="filled" size='small' style={{ width: "100%" }} />
                                    </div>
                                    <div className="loginFormInp">
                                        <TextField
                                            id="date"
                                            label="Birthday"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            sx={{ width: "100%" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size='small'
                                        />
                                    </div>
                                </div>
                                <div className="btnsSide">
                                    <div className="loginFormInpBtnSide">
                                        <TextField id="psw" label="Fullname" placeholder='Enter your first and last name' variant="filled" size='small' style={{ width: "100%" }} />
                                    </div>
                                    <button type="submit" className='loginBtn'>Signup</button><br /><br />
                                    <span className="orLogin">already have an account?</span><br />
                                    <button className='loginBtn signupBtn' onClick={() => navigate('/login')}>Login</button><br />
                                    <span className="orLogin mx-auto" style={{ textAlign: "center" }}>continue as seller</span><br />
                                    <button className='loginBtn signupBtn' onClick={() => navigate('/login')}>Signup as seller</button>


                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Signup
