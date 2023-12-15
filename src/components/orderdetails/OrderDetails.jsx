import React, { useEffect, useState } from 'react'
import "./orderdetails.scss"
import axios from 'axios'
import { useParams } from 'react-router-dom'

const OrderDetails = () => {

    const {id} = useParams()

    const [order, setOrder] = useState([])
    const userID = window.localStorage.getItem("userID");
    const email = window.localStorage.getItem("email");
    const getSingleOrder = async()=>{
        const response = await axios.get(`https://mern-eco-backend.onrender.com/order-detail/${id}`,{
            params:{
                userID,
                email
            }
        })
        setOrder(response.data)
    }

    useEffect(()=>{
        getSingleOrder()
    },[])

  return (
    <section>
        <div className={`container ${"table"}`}>
        <h2>Order Details</h2>
        <div>
            <a href="/orders">&larr; Back To Orders</a>
        </div>
        <br />
        {order.length === 0 ? (
            <h1>Loading...</h1>
        ) : (
            <>
            <p>
                <b>Order ID</b> {order._id}
            </p>
            <p>
                <b>Order Amount</b> ${order.cartTotalAmount}
            </p>
            <p>
                <b>Order Status</b> {order.orderStatus}
            </p>
            <br />
            <table>
                <thead>
                <tr>
                    <th>s/n</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {order.cartItems?.map((cart, index) => {
                    const { _id, name, price, image, cartTotalQuantity } = cart;
                    return (
                    <tr key={_id}>
                        <td>
                        <b>{index + 1}</b>
                        </td>
                        <td>
                        <p>
                            <b>{name}</b>
                        </p>
                        <img
                            src={image}
                            alt={name}
                            style={{ width: "100px" }}
                        />
                        </td>
                        <td>{price}</td>
                        <td>{cartTotalQuantity}</td>
                        <td>{(price * cartTotalQuantity).toFixed(2)}</td>
                        <td className={"icons"}>
                        <a href={`/review-product/${_id}`}>
                            <button className="--btn --btn-primary">
                                Review Product
                            </button>
                        </a>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </>
        )}
        </div>
    </section>
  )
}

export default OrderDetails