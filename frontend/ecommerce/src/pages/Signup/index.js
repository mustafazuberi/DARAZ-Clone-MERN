import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import "./signup.css"

import { useNavigate } from 'react-router-dom'



import { TextField } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2';





const baseUrl = "http://localhost:4000"
const Signup = () => {
    const navigate = useNavigate()

    const signup = async (e) => {
        e.preventDefault()
        if (document.getElementById("fullName").value.length < 1 || document.getElementById("email").value.length < 1 ||
            document.getElementById("DOB").value.length < 1 || document.getElementById("psw").value.length < 1) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all input fields!',
            })
            return
        } else if (document.getElementById("psw").value.length < 6) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your password should be at least 6 characters long.!',
            })
            return
        }

        try {
            const fullName = document.getElementById("fullName").value
            const email = document.getElementById("email").value
            const password = document.getElementById("psw").value
            const DOB = document.getElementById("DOB").value
            let response = await axios.post(`${baseUrl}/signup`, {
                fullName: fullName,
                email: email,
                password: password,
                DOB: DOB
            })
            await Swal.fire({
                title: `Dear ${fullName.split(" ")[0]}.Congratulations! Your account has been successfully created. 
                `,
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
        <div>
            <Navbar />

            <div className="mainSignupDiv">
                <div className="login">
                    <div className="welcome">
                        <h1>Create your Daraz Account.</h1>
                    </div>
                    <div className="loginFormDiv">
                        <form method='POST' onSubmit={signup}>
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
                                            id="DOB"
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
                                        <TextField id="fullName" label="Fullname" placeholder='Enter your first and last name' variant="filled" size='small' style={{ width: "100%" }} />
                                    </div>
                                    <button type="submit" className='loginBtn' >Signup</button><br /><br />
                                    <span className="orLogin">already have an account?</span><br />
                                    <button className='loginBtn signupBtn' onClick={() => navigate('/login')}>Login</button><br />
                                    <span className="orLogin mx-auto" style={{ textAlign: "center" }}>continue as seller</span><br />
                                    <button className='loginBtn signupBtn' onClick={() => navigate('/sellOnDaraz')}>Signup as seller</button>


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

export default Signup
