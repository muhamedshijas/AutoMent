import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';

function ServiceCenterHome() {
  const dispatch=useDispatch();
    
  async function handleLogout(id){
    if(window.confirm("are You sure")){
      await axios.get("/servicecenter/auth/logout")
      dispatch({type:"refresh"})
    }
  }
  return (
    <div>
    <h1 onClick={handleLogout} >
    ServiceCenterHome
    </h1>
    </div>
  )
}

export default ServiceCenterHome