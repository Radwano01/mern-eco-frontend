import axios from 'axios'
import "./verifysuccess.scss"
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const VerifySuccess = () => {
    const {email, verificationToken} = useParams()

    const handleVerify =async()=>{
       await axios.get(`https://mern-eco-backend.onrender.com/verify/${email}/${verificationToken}`)
    }
    useEffect(()=>{
        handleVerify()
    },[])
  return (
    <div className='verify-success'>
        <p>Account Verified</p>
        <button><a href="/login">Login Page</a></button>
    </div>
  )
}

export default VerifySuccess