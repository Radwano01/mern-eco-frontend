import React, { useEffect, useState } from 'react'
import "./women.scss"
import {useDispatch} from "react-redux"
import { ADD_TO_CARD } from '../../redux/CartSlice'
import axios from 'axios'

const Women = () => {

  const [products, setProducts] = useState([])
  const [filteredProduct, setFilteredProduct] = useState([])

  const getProduct = async()=>{
    const response = await axios.get("https://mern-eco-backend.onrender.com/products")
    const product = response.data
    const Productsfilter =await product.filter((e)=> e.category === "women")
    setProducts(Productsfilter)
  }
  useEffect(()=>{
    getProduct()
  },[])
  const dispatch = useDispatch()

  const addToCart = (product) =>{
    dispatch(ADD_TO_CARD(product))
  }

  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")

  useEffect(() => {
    let filteredList = products;

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === 'highest') {
      filteredList.sort((a, b) => a.price - b.price);
    } else if (sort === 'lowest') {
      filteredList.sort((a, b) => b.price - a.price);
    }else if(sort === "all"){
      filteredList = products
    }

    setFilteredProduct(filteredProducts);
  }, [search, sort, products]);

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const startIndex = (currentPage - 1) * itemsPerPage
  const PageData = filteredProduct.slice(startIndex, startIndex + itemsPerPage)

return (
  <div className="women-page">
    <div className='search-sort'>
      <input
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="all">All</option>
        <option value="highest">highest Price</option>
        <option value="lowest">Lowest Price</option>
      </select>
    </div>
    <div className="women-grid">
      {PageData.map((product)=>(
        <div className='women'>  
            <div className="card">
                <div className="img">
                  <a href={`/product-details/${product._id}`}> 
                    <img src={product.image} alt="" style={{width:"200px", height:"300px"}}/>
                  </a>
                </div>
                <div className="info">
                <div className="left">
                  <h4>{product.name}</h4>
                  <h6>{product.brand}</h6>
                </div>
                <div className="right">
                  <b>${product.price}</b>
                  <button onClick={()=> addToCart(product)}>Add</button>
                </div> 
              </div>
            </div>
        </div>   
        ))}
    </div>
        <div className="pagination">
        <button onClick={()=> setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >Previous</button>
        <b>{currentPage}</b>
        <button onClick={()=> setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredProduct.length / itemsPerPage)}
        >
          Next</button>
        </div>
  </div>
);
}

export default Women