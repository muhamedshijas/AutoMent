import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux'
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import './AdminHome.css'

function AdminHome() {
  const dispatch=useDispatch();
  async function handleLogout(){
    if(window.confirm("are You sure")){
      await axios.get("/admin/auth/logout")
      dispatch({type:"refresh"})
    }
  }
  return (
    <div className="app">
    <section className="row">
    
    <AdminSideBar/>
    h1
    </section>
    
    </div>
  ) 
}

export default AdminHome