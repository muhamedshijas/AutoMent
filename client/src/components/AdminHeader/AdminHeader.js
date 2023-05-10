import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import './AdminHeader.css'

function AdminHeader() {
    const dispatch=useDispatch();
    
  async function handleLogout(id){
    if(window.confirm("are You sure")){
      await axios.get("/admin/auth/logout")
      dispatch({type:"refresh"})
    }
  }
  return (
   <header>
   <h3>AutoMend</h3>
   <button onClick={handleLogout}>Logout</button>
   </header>
  )
}

export default AdminHeader