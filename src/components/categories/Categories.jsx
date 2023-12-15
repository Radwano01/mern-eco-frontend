import React from 'react'
import "./categories.scss"
import childrenImg from "../../assets/products/children.jpeg"
import menImg from "../../assets/products/men.jpeg"
import womenImg from "../../assets/products/women.jpeg"

const Categories = () => {
  return (
    <div className='categories'>
        <div className="category">
            <a href='/women'>
                <img src={womenImg} alt="" />
                <h2>women</h2>
            </a>
        </div>
        <div className="category">
            <a href="/men">
                <img src={menImg} alt="" />
                <h2>men</h2>
            </a>
        </div>
        <div className="category">
            <a href="/children">
                <img src={childrenImg} alt="" />
                <h2>children</h2>
            </a>
        </div>
    </div>
  )
}

export default Categories