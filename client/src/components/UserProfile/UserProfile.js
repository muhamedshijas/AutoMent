import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './userProfile.css'

function UserProfile() {
  const user=useSelector((state)=>{
    return state.user.detials

  });

 

  console.log(user)
  const dispatch=useDispatch();
  async function handleLogout(){
    if(window.confirm("are You sure")){
      await axios.get("/user/auth/logout")
      dispatch({type:"refresh"})
    }
  }
  return (
    <div>
    <div className="userProfile">
    <div className="profile">
    <div className="img">
    <img src="data:image/png;base64,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" alt="" />
    </div>
    <div className="user">
    <h1>{user.name}</h1>
    <b>{user.email}</b>
    <b>{user.mobileNo}</b>
    </div>
    <Link to={'/edit-profile/'+user._id}>
    <button className='edit-profile'>Edit profile</button>
    </Link>
    <button onClick={handleLogout}>Logout</button>
    </div>

    <div className="serviceHistory">
    <h4>Service History</h4>
    <div className="card">
    <div className="detials">
    <p>Date</p>
    <p>Package Type</p>
    <p>Service Center</p>
    <p>Vehicle Model No</p>
    </div>
    <div className="status">
    <p className="text-primary">upcoming</p>
    </div>
    </div>
    <div className="card">
    <div className="detials">
    <p>Date</p>
    <p>Package Type</p>
    <p>Service Center</p>
    <p>Vehicle Model No</p>
    </div>
    <div className="status">
    <p className="text-success">completed</p>
    <a href='#' className='text-info'>View Detials</a>
    </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default UserProfile