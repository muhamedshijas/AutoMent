import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux';

function ServiceCenterHeader() {

    const dispatch=useDispatch();
    async function handleLogout(){
        if(window.confirm("are You sure")){
          await axios.get("/servicecenter/auth/logout")
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

export default ServiceCenterHeader