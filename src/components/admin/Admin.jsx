import React from 'react'
import "./admin.scss"
import AdminNavbar from './adminnavbar/AdminNavbar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './addproduct/AddProduct'
import EditProduct from './editproduct/EditProduct'
import ViewProducts from './viewproduct/ViewProducts'
import Orders from './adminorders/Orders'
import OrdersDetails from './adminorderdetails/OrdersDetails'
import Home from './home/Home'

const Admin = () => {
  return (
    <div className='admin-navbar-container'>
        <div className="admin-navbar">
            <AdminNavbar/>
        </div>
        <div className="admin-components">
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/add-product' element={<AddProduct/>}/>
                <Route path="/edit-product/:id" element={<EditProduct/>}/>
                <Route path='/all-products' element={<ViewProducts/>}/>
                <Route path='/admin-orders' element={<Orders/>}/>
                <Route path='/order-detail/:id' element={<OrdersDetails/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default Admin