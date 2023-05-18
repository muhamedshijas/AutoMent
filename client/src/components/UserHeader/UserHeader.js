import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './UserHeader.css'

function UserHeader() {
    
    const user=useSelector((state)=>{
        return state.user.detials

      });
      const dispatch=useDispatch();
      async function handleLogout(){
        if(window.confirm("are You sure")){
          await axios.get("/user/auth/logout")
          dispatch({type:"refresh"})
        }
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