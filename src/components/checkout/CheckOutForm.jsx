import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import "./checkoutform.scss"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate()
  
    const [message, setMessage] = useState(null);

    const shippingAddress = useSelector((state)=> state.cart.shippingAddress)
    const cartItems = useSelector((state)=> state.cart.cartItems)
    const cartTotalQuantity = useSelector((state)=> state.cart.cartTotalQuantity)
    const cartTotalAmount = useSelector((state)=> state.cart.cartTotalAmount)

    const userID = window.localStorage.getItem("userID")
    const email = window.localStorage.getItem("email")

    const saveOrder = async()=>{
        try{
            const response = await axios.post("https://mern-eco-backend.onrender.com/orders",{
                userID: userID,
                email: email,
                cartItems: cartItems,
                shippingAddress: shippingAddress,
                cartTotalQuantity:cartTotalQuantity,
                cartTotalAmount: cartTotalAmount
            }) 
            navigate("/checkout-success")
            resetCartItems()
        }catch(err){
            console.log("err order frontend", err)
        }
    }
    const resetCartItems = ()=>{
       window.localStorage.removeItem("cartItems")
    }
    useEffect(() => {
      if (!stripe) {
        return;
      }
  
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }
  
    }, [stripe]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(null)
  
      if (!stripe || !elements) {
  
        return;
      }
  
  
  
      const comfirmPayment = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required"
      }).then((result)=>{
        if(result.error){
          setMessage(result.error.message)
          return;
        }else{
          saveOrder()
        }
      }).catch((err)=>{
        console.log(err)
      })
      return comfirmPayment
    };
  
    const paymentElementOptions = {
      layout: "tabs"
    }
  
    return (
      <form id="payment-form" onSubmit={handleSubmit} className='payment-form'>
        <div className="payment-input">
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={ !stripe || !elements} id="submit">
                Pay Now
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </div>
      </form>
    );
}

export default CheckOutForm