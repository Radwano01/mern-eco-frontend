import React, { useEffect, useState } from 'react'
import "./orders.scss"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {

    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    const getOrders = async()=>{
        const response = await axios.get("https://mern-eco-backend.onrender.com/orders")
        setOrders(response.data)
    }

    useEffect(()=>{
        getOrders()
    },[])
    

    const handleClick = (id)=>{
        navigate(`/admin/order-detail/${id}`)
    }

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const startIndex = (currentPage - 1) * itemsPerPage
    const dataPage = orders.slice(startIndex, startIndex + itemsPerPage)
    return (
        <>
          <div className="pagitaion">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
              {currentPage}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
          <div className={"order"}>
            <h2>Your Order History</h2>
            <p>
              Open an order to <b>Change order status</b>
            </p>
            <br />
            <>
              <div className={"table"}>
                {dataPage.length === 0 ? (
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
                      {orders.map((orders, index) => {
                        const {
                          _id,
                          orderDate,
                          cartTotalAmount,
                          orderStatus,
                        } = orders;
                        return (
                          <tr key={_id} onClick={() => handleClick(_id)}>
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
                                    ? `${"pending"}`
                                    : `${"delivered"}`
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
        </>
      );
}

export default Orders