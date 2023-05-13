import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux'
import UserBanner from '../UserBanner/UserBanner';
import './userHome.css'

function UserHome() {
  const dispatch=useDispatch();
  
  return (
    <div className='app'>
    <div className="userBanner">
    
    <UserBanner/>
    </div>
    <h1>user Home</h1>
    </div>
  )
}

export default UserHome