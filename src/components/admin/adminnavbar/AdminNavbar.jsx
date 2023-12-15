import React from 'react'
import "./adminnavbar.scss"
import {BiSolidUserCircle} from "react-icons/bi"
import {AiOutlineCaretRight} from "react-icons/ai"

const AdminNavbar = () => {
  return (
    <div className='admin-page'>
      <div className='admin'>
        <div className="admin-user-page">
          <BiSolidUserCircle size={50} color='white'/><br />
          <b>ADMIN</b>
        </div><hr />
        <ul>
          <h3><a href='/admin/home'><AiOutlineCaretRight size={18}/>Home</a></h3>
          <h3><a href='/admin/add-product'><AiOutlineCaretRight size={18}/> Add Product</a></h3>
          <h3><a href='/admin/edit-product/:id'><AiOutlineCaretRight size={18}/>Edit Product</a></h3>
          <h3><a href='/admin/admin-orders'><AiOutlineCaretRight size={18}/>Orders</a></h3>
          <h3><a href='/admin/all-products'><AiOutlineCaretRight size={18}/>All Products</a></h3>
        </ul>
      </div>
    </div>
  )
}

export default AdminNavbar