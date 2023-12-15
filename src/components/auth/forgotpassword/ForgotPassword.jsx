import React, { useState } from 'react'
import "./forgotpassword.scss"
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const handleForgotPassword = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post("https://mern-eco-backend.onrender.com/forgot-password", {
                email: email,
            }) 
            if(response){
                console.log("success")
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='forgot-password'>
        <form onSubmit={handleForgotPassword}>
            <h2>Forgot Password</h2>
            <div className="email">
                <input type="email" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <button type='submit'>Forgot Password</button>
        </form>
    </div>
  )
}

export default ForgotPassword