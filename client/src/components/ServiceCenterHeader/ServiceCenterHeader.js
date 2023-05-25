import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2'
function ServiceCenterHeader() {

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
        await axios.get("/servicecenter/auth/logout")
      dispatch({type:"refresh"})
      }
    })
  }

     

  return (
    <header>
    <h3>AutoMend</h3>
    <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export default ServiceCenterHeader