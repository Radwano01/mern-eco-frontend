import React, { useEffect, useState } from 'react';
import "./viewproducts.scss";
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Notiflix from "notiflix";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ViewProducts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const AllProducts = async () => {
    const response = await axios.get("https://mern-eco-backend.onrender.com/products");
    setData(response.data);
  }

  const EditProduct = (_id) => {
    navigate(`/admin/edit-product/${_id}`);
  }

  const confirmDelete = async (_id) => {
    try {
      await axios.delete(`https://mern-eco-backend.onrender.com/products/${_id}`);
      window.location.reload();
    } catch (error) {
      console.log("error notiflix", error);
    }
  }

  useEffect(() => {
    AllProducts();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
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
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      <ToastContainer />
      <table>
        <thead>
          <tr>
            <th>s/n</th>
            <th>name</th>
            <th>brand</th>
            <th>price</th>
            <th>category</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((item, index) => {
            const { _id, name, brand, price, image, category } = item;
            return (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>
                  <p>{name}</p>
                  <img src={image} alt={name} style={{ width: "100px" }} />
                </td>
                <td>{brand}</td>
                <td>${price}</td>
                <td>{category}</td>
                <td className='icons'>
                  <AiFillEdit size={19} color='green' onClick={() => EditProduct(_id)} />{" "}
                  <FaTrashAlt size={19} color="red" onClick={() => confirmDelete(_id)} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ViewProducts;
