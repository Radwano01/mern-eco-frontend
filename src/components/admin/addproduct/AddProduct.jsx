import React, { useState } from 'react'
import "./addproduct.scss"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import FileBase64 from "react-file-base64"

const AddProduct = () => {
  const [name, setName] = useState("")
  const [image, setImage] = useState(null)
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  
  const navigate = useNavigate()

  const handleAddProduct = async(e)=>{
    e.preventDefault()
    try{
      await axios.post("https://mern-eco-backend.onrender.com/products", {
        name: name,
        image: image,
        brand: brand,
        category: category,
        price: price,
        desc: desc
      })
      navigate("/admin/all-products")
    }catch(err){
      console.log(`error addproduct: ${err}`)
    }
  }
  return (
    <div className='add-product'>
      <h1>Add New Products:</h1>
      <form onSubmit={handleAddProduct}>
        <input type="name" placeholder='name' maxLength="13" value={name} onChange={(e)=> setName(e.target.value)} required/>
        <FileBase64 
          multiple={false}
          onDone={({base64})=>setImage(base64)}
          required
        />
        <input type="text" placeholder='brand' value={brand} onChange={(e)=> setBrand(e.target.value)} required/>
        <select value={category} onChange={(e)=> setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="women" >Women</option>
          <option value="men">men</option>
          <option value="children">children</option>
        </select>
        <input type="number" placeholder='price' value={price} onChange={(e)=> setPrice(e.target.value)} required/>
        <textarea cols={30} rows={10} type='text' placeholder='description' value={desc} onChange={(e)=> setDesc(e.target.value)} required/>
        <button>Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct