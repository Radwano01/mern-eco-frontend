import React, { useState } from 'react'
import "./ResetPassword.scss"
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom"

const ForgotPassword = () => {
    const [password, setPassword] = useState("")
    const {id, token} = useParams()
    const navigate = useNavigate()
    const handleForgotPassword = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post(`https://mern-eco-backend.onrender.com/reset-password/${id}/${token}`, {
                password: password,
            })
            if(response){
                console.log("pass changed success")
                navigate("/")
            }
        }catch(err){
            console.log(err)
        }
  
    }
  return (
    <div className='reset-password'>
        <form onSubmit={handleForgotPassword}>
            <h2>New Password</h2>
            <div className="email">
                <input type="password" placeholder='New Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <button type='submit'>Reset Password</button>

        </form>
    </div>
  )
}

export default ForgotPassword