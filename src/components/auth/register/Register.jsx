import React, { useState } from 'react'
import "./register.scss"
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai"
import axios from 'axios'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [RegisterMessage, setRegisterMessage] = useState("")

    const handleShowPassword = ()=>{
        setShowPassword(!showPassword)
    }
    
    const handleRegister = async(e)=>{
        e.preventDefault()
            const response = await axios.post("https://mern-eco-backend.onrender.com/register", {
                email: email,
                password: password,
            }).then(() => {
                setRegisterMessage(<>Registration successful. <br /> A verification email has been sent.</>);
            })
            .catch((err) => {
                console.log(err);
            });   
    }

  return (
    <div className='register'>
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                <div className="email">
                    <input type="email" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className="password">
                    <input type={showPassword ? "text" : "password"} placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <div className="password-icon">
                        {showPassword ? (<AiFillEye onClick={handleShowPassword}/>) : (<AiFillEyeInvisible onClick={handleShowPassword}/>)}
                    </div>
                </div>
                <button type='submit'>Sign up</button>
                <a href="/login">You have an account?</a><br /> 
                {RegisterMessage}
            </form>
    </div>
  )
}

export default Register