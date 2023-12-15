import React, { useEffect } from 'react'
import "./cart.scss"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {FaTrashAlt} from "react-icons/fa"
import { ADD_TO_CARD, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, DELETE_CART} from '../redux/CartSlice'
    
  const Cart = () => {
    const cartItems = useSelector((state)=> state.cart.cartItems)
    const cartTotalAmount = useSelector((state)=> state.cart.cartTotalAmount)
    const cartTotalQuantity = useSelector((state)=> state.cart.cartTotalQuantity)

    const dispatch = useDispatch()
   const navigate = useNavigate() 
    

    const increaseCart =(cart)=>{
      dispatch(ADD_TO_CARD(cart))
    }

    const decreaseCart =(cart)=>{
      dispatch(DECREASE_CART(cart))
    }

    const deleteCart = (cart)=>{
      dispatch(DELETE_CART(cart))
    }

    const clearCart = ()=>{
      dispatch(CLEAR_CART())
    }

    useEffect(()=>{
      dispatch(CALCULATE_SUBTOTAL())
      dispatch(CALCULATE_TOTAL_QUANTITY())
    },[dispatch, cartItems])

    
    const isLoggedIn = window.localStorage.getItem("userID")
    const CheckOut = ()=>{
      if(isLoggedIn){
        navigate("/checkout-details")
      }else{
        navigate("/login")
      }
    }

    return (
      <section>
        <div className={`container ${"table"}`}>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ?(
            <>
              <p>Your cart is currently empty</p>
              <br />
              <div>
                <Link to="/#product">&larr; Continue shopping</Link>
              </div>
            </>
          ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index)=>{
                      const {_id, name, price, image, cartTotalQuantity} = item
                      return(
                        <tr key={_id}>
                          <td>{index + 1}</td>
                          <td>
                            <p>
                              {name}
                            </p>
                            <img src={image} alt={name} style={{width:"100px"}}/>
                          </td>
                          <td>{price}</td>
                          <td>
                            <div className="count">
                              <button className='--btn' onClick={()=> decreaseCart(item)}>-</button>
                              <p>
                                <b>{cartTotalQuantity}</b>
                              </p>
                              <button className="--btn" onClick={()=> increaseCart(item)}>+</button>
                            </div>
                          </td>
                          <td>{(price * cartTotalQuantity).toFixed(2)}</td>
                          <td className='icons'>
                            <FaTrashAlt size={19} color="red" onClick={()=> deleteCart(item)}/>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className="summary">
                    <button className='--btn' onClick={()=> clearCart()}>Clear Cart</button>
                    <div className="checkout-cart">
                      <div className="">
                        <Link to="/#product">&larr; Continue Shopping</Link>
                      </div>
                      <br />
                      <div cardClass="cart-card">
                        <p>{`cart item(s): ${cartTotalQuantity}`}</p>
                        <div className="text">
                          <h4>subtotal:</h4>
                          <h3>{`$${cartTotalAmount?.toFixed(2)}`}</h3>
                        </div>
                        <p>Tax an shipping calculated at checkout</p>
                        <button className='--btn --btn-primary --btn-block' onClick={CheckOut}>Checkout</button>
                      </div>
                    </div>
                </div>
              </>
          )}
        </div>
      </section>
    )
  }
    
export default Cart