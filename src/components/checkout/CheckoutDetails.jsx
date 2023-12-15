import React, { useState } from 'react'
import "./CheckoutDetails.scss"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SAVE_SHIPPING_ADDRESS } from '../redux/CartSlice'
import CheckoutSummary from './CheckOutSummary'

const initialAddressState = {
    name : "",
    line1 : "",
    line2 : "",
    city : "",
    state : "",
    postal_code : "",
    phone: "",
}

const CheckoutDetails = () => {
    
    const [shippingAddress, SetShippingAddress] = useState({...initialAddressState})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const handleShipping = (e) => {
      const { name, value } = e.target;
      SetShippingAddress((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit =()=>{
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
        navigate("/checkout")
    }

    const email = window.localStorage.getItem("email")

    return (
        <section>
          <div className={`container ${"checkout"}`}>
            <form onSubmit={handleSubmit}>
              <h2>Checkout Details</h2>
              <div>
                <div className={"checkout-card"}>
                  <h3>Shipping Address</h3><br />
                  <label>Your Email</label>
                  <input
                    type="text"
                    placeholder={email}
                    required
                    name="email"
                    value={email}
                    onChange={(e) => handleShipping(e)}
                    disabled
                  />
                  <label>Recipient Name</label>
                  <input
                    type="text"
                    placeholder="Recipient Name"
                    required
                    name="name"
                    value={shippingAddress.name}
                    onChange={(e) => handleShipping(e)}
                  />
                  <label>Address line 1</label>
                  <input
                    type="text"
                    placeholder="Address line 1"
                    required
                    name="line1"
                    value={shippingAddress.line1}
                    onChange={(e) => handleShipping(e)}
                  />
                  <label>Address line 2</label>
                  <input
                    type="text"
                    placeholder="Address line 2"
                    name="line2"
                    value={shippingAddress.line2}
                    onChange={(e) => handleShipping(e)}
                  />
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleShipping(e)}
                  />
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="State"
                    required
                    name="state"
                    value={shippingAddress.state}
                    onChange={(e) => handleShipping(e)}
                  />
                  <label>Postal code</label>
                  <input
                    type="text"
                    placeholder="Postal code"
                    required
                    name="postal_code"
                    value={shippingAddress.postal_code}
                    onChange={(e) => handleShipping(e)}
                  />
                  {/* COUNTRY INPUT */}
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="Phone"
                    required
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <button type='submit'>CheckOut</button>
              </div>
            </form>
            <div className="summary">
              <CheckoutSummary/>
            </div>
          </div>
        </section>
      );
}

export default CheckoutDetails