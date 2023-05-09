import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux'

function UserHome() {
  const dispatch=useDispatch();
  async function handleLogout(){
    if(window.confirm("are You sure")){
      await axios.get("/user/auth/logout")
      dispatch({type:"refresh"})
    }
  }
  return (
    <div className='app'>
    <h1>user Home</h1>
    <h1 onClick={handleLogout}>Logout</h1>
    </div>
  )
}

export default UserHome