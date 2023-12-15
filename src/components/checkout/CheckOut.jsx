import React, { useEffect, useState } from 'react'
import CheckOutForm from './CheckOutForm';
import {Elements} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import "./checkout.scss"
import CheckoutSummary from './CheckOutSummary';

const CheckOut = () => {
    const cartItems = useSelector((state)=> state.cart.cartItems)
    const shippingAddress = useSelector((state)=> state.cart.shippingAddress)
    const cartTotalQuantity = useSelector((state)=> state.cart.cartTotalQuantity)
    const [clientSecret, setClientSecret] = useState("");
    const stripePromise = loadStripe(process.env.SRTIPE_PUBLIC_REACT_APP);
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads 
        fetch("https://mern-eco-backend.onrender.com/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cartItems:cartItems,
            shippingAddress:shippingAddress,
            cartTotalQuantity:cartTotalQuantity
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [cartItems, shippingAddress, cartTotalQuantity]);
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
  return (
    <div className='payment'>
        <CheckoutSummary/>
        <div className="cart-payment">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            )}
        </div>
    </div>
  )
}

export default CheckOut