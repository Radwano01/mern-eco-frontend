import React, { useEffect, useState } from 'react';
import "./editproduct.scss"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import FileBase64 from "react-file-base64"
const EditProduct = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState(null)
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")

  const handleEditProduct = async()=>{
    try{
      const response = await axios.put(`https://mern-eco-backend.onrender.com/products/${id}`,{
        name:name,
        image:image,
        brand:brand,
        category:category,
        price:price,
        desc:desc
      })
      navigate("/admin/all-products")
    }catch{
      console.log("err editing")
    }
    
  }

  useEffect(() => {
    if (id === ":id") {
      setError("Choose a product to edit");
    } else {
      setError("");
    }
  }, [id]);
  
  return (
    <div className='edit-product'>
      <h1>Edit Product:</h1>
      <h4 style={{padding: "20px"}}>id: {id !== ":id" ? id : error}</h4>
      <form onSubmit={handleEditProduct}>
        <input type="text" placeholder='name' value={name} onChange={(e)=> setName(e.target.value)}/>
        <FileBase64 
          multiple={false}
          onDone={({base64})=>setImage(base64)}
          required
        />
        <input type="text" placeholder='brand' value={brand} onChange={(e)=> setBrand(e.target.value)}/>
        <select value={category} onChange={(e)=> setCategory(e.target.value)}>
          <option value="women" >Women</option>
          <option value="men">men</option>
          <option value="children">children</option>
        </select>
        <input type="number" placeholder='price' value={price} onChange={(e)=> setPrice(e.target.value)}/>
        <textarea cols={30} rows={10} type='text' placeholder='description' value={desc} onChange={(e)=> setDesc(e.target.value)} required/>
        <button>Edit Product</button>
      </form>
      <div className="not">
        <p style={{padding: "20px", color:"red"}}><b>NOT : select the product you want to edit from all product and edit the product.</b></p>
      </div>
    </div>
  );
}


export default EditProduct;
