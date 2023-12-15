import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import "./singlepage.scss"
import { useDispatch } from 'react-redux'
import { ADD_TO_CARD } from '../redux/CartSlice'

const SinglePage = () => {

    const [products, setProducts] = useState([])
    const {id} = useParams()
    const getSingleProduct = async()=>{
        try{
            const response = await axios.get(`https://mern-eco-backend.onrender.com/product-details/${id}`)
            const product = response.data
            setProducts(product)
        }catch{
            console.log("error fetch single page")
        }
    }
    useEffect(() => {
        getSingleProduct();
    }, []);
    console.log(products)

    const dispatch = useDispatch()

    const handleAddToCart = (products)=>{
        dispatch(ADD_TO_CARD(products))
    }

  return (
    <div className='single-page-container'>
        <br />
        <a href="/children">&larr; Back to Products</a>
        {products ? (
            <div className='single-page'>
                <div className="left">
                    <img src={products.image} alt="" />
                </div>
                <div className="right">
                    <h1 key={products._id}>{products.name}</h1>
                    <h3>{products.brand}</h3>
                    <b>${products.price}</b>
                    <p>{products.desc}</p>
                    <button onClick={()=> handleAddToCart(products)}>Add to cart</button>
                </div>

            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
  )
}

export default SinglePage