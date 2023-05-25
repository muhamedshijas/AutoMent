import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './UserHeader.css'

function UserHeader() {
    
    const user=useSelector((state)=>{
        return state.user.detials

      });
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
            await axios.get("/user/auth/logout")
            dispatch({type:"refresh"})
          }
        })
      }
        
  return (
    <div className="nav">
    <div className="logo">
    <Link to ='/'>
    <h3>AutoMent</h3>
    </Link>
    </div>
    <div className="detials">
    <Link to ='/profile'>
    
    <h5>{user.name}</h5>
    </Link>
    <button onClick={handleLogout}>Logout</button>
    </div>
    </div>

  )
}

export default UserHeader