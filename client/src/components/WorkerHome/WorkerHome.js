import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';

function WorkerHome() {
    const dispatch=useDispatch();
    
  async function handleLogout(id){
    if(window.confirm("are You sure")){
      await axios.get("/worker/auth/logout")
      dispatch({type:"refresh"})
    }
  }
  return (
    <div>WorkerHome
    <button classNam='btn btn-primary' onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default WorkerHome