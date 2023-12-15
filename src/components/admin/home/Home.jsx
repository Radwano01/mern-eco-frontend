import axios from 'axios'
import "./home.scss"
import React, { useEffect, useState } from 'react'
import { AiFillDollarCircle } from "react-icons/ai"
import { BsCart4 } from "react-icons/bs"
import {FaCartArrowDown} from "react-icons/fa"
import InfoBox from './InfoBox'
import Chart from './Chart'

const Home = () => {

    const [productFilter, setProductFilter] = useState([])
    const [orderFilter, setOrderFilter] = useState([])
    const [amount, setAmount] = useState(0)
    const [ordersStatus , setOrdersStatus] = useState([])
    const getProducts = async()=>{
        const response = await axios.get("https://mern-eco-backend.onrender.com/products")
        const filter = response.data.length
        setProductFilter(filter)
    }

    const getOrders = async()=>{
        const response = await axios.get("https://mern-eco-backend.onrender.com/orders")
        const filter = response.data.length
        const orders = response.data
        const amountFilter = await orders.reduce((total, order)=> total + (order.cartTotalAmount || 0),0)
        const ordersStatus = orders.map((order)=> (order.orderStatus))
        setOrdersStatus(ordersStatus)
        setOrderFilter(filter)
        setAmount(amountFilter)
    }

    useEffect(()=>{
        getProducts()
        getOrders()
    },[])

  return (
    <div className="home-admin">
        <div className="info-box">
            <InfoBox className={"card-box  cardone-box"} title={"Earnings"} count={`$${amount}`} icon={<AiFillDollarCircle size={30} color='#b624ff'/>}/>
            <InfoBox className={"card-box  cardtwo-box"} title={"Products"} count={`${productFilter}`} icon={<BsCart4 size={30} color='#1f93ff'/>}/>
            <InfoBox className={"card-box  cardthree-box"} title={"Orders"} count={orderFilter} icon={<FaCartArrowDown size={30} color='orangered'/>}/>
        </div>
        <div className="chart">
            <Chart orderStatus={ordersStatus}/>
        </div>
    </div>
  )
}

export default Home