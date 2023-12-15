import React, { useState } from 'react';
import "./changeorderstatus.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangeOrderStatus = ({ order, id }) => {

    const [status, setStatus] = useState("");
    const navigate =useNavigate()

    const handleChange = async (e) => {
        try{
            e.preventDefault();
            const response = await axios.put(`https://mern-eco-backend.onrender.com/change-status/${id}`, {
                ...order,
                orderStatus: status
            });
            navigate("/admin/admin-orders")
            toast.success("Status Edited Successfully")
        }catch{
            toast.error("something went wrong")
        }
    };

    return (
        <div className='status'>
            <form onSubmit={handleChange}>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="" disabled>-- Choose One --</option>
                    <option value="Processing...">Processing...</option>
                    <option value="Order Placed...">Order Placed...</option>
                    <option value="Shipped...">Shipped...</option>
                    <option value="Delivered">Delivered</option>
                </select><br />
                <button type='submit'>Change Status</button>
            </form>
        </div>
    );
}

export default ChangeOrderStatus;
