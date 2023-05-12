import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux'

function UserHome() {
  const dispatch=useDispatch();
  
  return (
    <div className='app'>
    <h1>user Home</h1>
    </div>
  )
}

export default UserHome