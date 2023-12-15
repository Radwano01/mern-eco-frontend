import axios from 'axios'
import React, { useState } from 'react'
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai"
import "./login.scss"
import { useNavigate } from 'react-router-dom'
import {useCookies} from "react-cookie"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [x, setCookies] = useCookies(["token_access"])

    const navigate = useNavigate()
    
    const handleShowPassword = ()=>{
        setShowPassword(!showPassword)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://mern-eco-backend.onrender.com/login", {
                email,
                password
            });
            console.log(response.data)
            if (response.data.id && response.data.token) {
                setCookies("token_access", response.data.token);
                window.localStorage.setItem("userID", response.data.id);
                navigate("/");
                window.location.reload(true)
                window.localStorage.setItem("email", email)
            }else{
                console.log("err missing token and id")
            }
        } catch (err) {
            console.error(err);
        }
    };
    
  return (
    <div className='login'>
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="email">
                <input type="email" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="password">
                <input type={showPassword ? "text" : "password"} placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <div className="password-icon">
                    {showPassword ? (<AiFillEye onClick={handleShowPassword}/>) : (<AiFillEyeInvisible onClick={handleShowPassword}/>)}
                </div>
            </div>
            <button type='submit'>Sign in</button>
            <a href="/register">You don't have an account?</a>
            <a href="/forgot-password">Forgot your password?</a>
        </form>
    </div>
  )
}

export default Login