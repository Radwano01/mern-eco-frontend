import React, { useEffect, useState } from 'react'
import "./orders.scss"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SAVE_ORDERS } from '../redux/CartSlice'

const Orders = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [orderData, setOrderData] = useState([])

  const getOrders = async()=>{
    const response = await axios.get("https://mern-eco-backend.onrender.com/orders")
    setOrderData(response.data)
  }
 
  useEffect(()=>{
    getOrders()
    dispatch(SAVE_ORDERS(orderData))
  },[dispatch, orderData])

  const orders = useSelector((state)=> state.cart.orders)

  const userID = window.localStorage.getItem("userID")
  const email = window.localStorage.getItem("email")

  const filteredOrders = orders?.filter((order)=> order.userID === userID)
  const filteredOrder = filteredOrders?.filter((order)=> order.email === email)

  const handleClick = (_id)=>{
    navigate(`/order-details/${_id}`)
  }

  return (
        <section>
    <div className={`container ${"order"}`}>
      <h2>Your Order History</h2>
      <p>
        Open an order to leave a <b>Product Review</b>
      </p>
      <br />
      <>
        <div className={"table"}>
          {filteredOrder.length === 0 ? (
            <p>No order found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrder.map((orders, index) => {
                  const {
                    _id,
                    orderDate,
                    cartTotalAmount,
                    orderStatus,
                  } = orders;
                  return (
                    <tr key={_id} onClick={()=> handleClick(_id)}>
                      <td>{index + 1}</td>
                      <td>
                        at {orderDate}
                      </td>
                      <td>{_id}</td>
                      <td>
                        {"$"}
                        {cartTotalAmount}
                      </td>
                      <td>
                        <p
                          className={
                            orderStatus !== "Delivered"
                              ? "pending"
                              : "delivered"
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </>
    </div>
  </section>
  )
}

export default Orders