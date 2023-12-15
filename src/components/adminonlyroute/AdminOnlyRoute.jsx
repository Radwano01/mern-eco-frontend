import React from 'react'
import { Link } from 'react-router-dom'

const AdminOnlyRoute = ({children}) => {

    const email = window.localStorage.getItem("email")
    const userID = window.localStorage.getItem("userID")
    if(email === process.env.REACT_APP_EMAIL){
        if(userID === process.env.REACT_APP_USERID){
            return children
        }
    }else{
        return(
            <section style={{ height: "80vh" }}>
                <div className="container">
                <h2>Permission Denied.</h2>
                <p>This page can only be view by an Admin user.</p>
                <br />
                <Link to="/">
                    <button className="--btn">&larr; Back To Home</button>
                </Link>
                </div>
            </section>
        )
    }
}

export default AdminOnlyRoute