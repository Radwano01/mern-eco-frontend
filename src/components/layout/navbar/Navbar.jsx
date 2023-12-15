import React from 'react'
import "./navbar.scss"
import {AiOutlineShoppingCart} from "react-icons/ai"
import AdminOnlyRoute from '../../adminonlyroute/AdminOnlyRoute';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const cartItems = useSelector((state)=> state.cart.cartItems)
    const cartQuantity = cartItems.length
    const userID = window.localStorage.getItem('userID');
    const SignOut = ()=>{
        window.localStorage.removeItem("userID")
        window.localStorage.removeItem("email")
        window.location.reload(true)
    }

  return (
    <>
        <div className='top-navbar'>
            <div className="left">
                <div className="logo">
                    <h1><a href="/">Logo</a></h1>
                </div>
            </div>
            <div className="middle">
                <AdminOnlyRoute>
                    <a href="/admin/home">Admin </a>
                </AdminOnlyRoute>
                <a href="/">Home </a>
                <a href="/">about </a>
                <a href="/contact">contact </a>
            </div>
            <div className="right">
                <ul>
                {userID ? (
                    <>
                        <li><a href="/orders">Orders</a></li>
                        <button onClick={SignOut} style={{backgroundColor:'transparent',color:"white",border:"none", padding:"5px", cursor:"pointer"}}>
                            Sign Out
                        </button>
                    </>
                    ) : (
                    <>
                        <li><a href="/login">login</a></li>
                        <li><a href="/register">Register</a></li>
                    </>
                )}
                    <li className='cart'><a href="/cart"><AiOutlineShoppingCart size={25}/></a><span>{cartQuantity}</span></li>
                </ul>
            </div>
        </div>
        <div className="bottom-navbar">
            <ul>
                <li><a href="/men"> Men -</a></li>
                <li><a href="/women"> Women -</a></li>
                <li><a href="/children">Kid</a></li>
            </ul>
        </div>
    </>

  )
}

export default Navbar