import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import './AdminHeader.css'

function AdminHeader() {
    const dispatch=useDispatch();
    
    async function handleLogout(e) {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure? logout',
      text: "logout from this account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Logout!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.get("/admin/auth/logout")
        dispatch({ type: "refresh" })
      }
    })
  }
  return (
   <header>
   <Link to='/admin'>
   <h3>AutoMend</h3>
   </Link>
   <button onClick={handleLogout}>Logout</button>
   </header>
  )
}

export default AdminHeader