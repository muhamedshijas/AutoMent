import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './workerProfile.css'

function WorkerProfile() {
        const dispatch=useDispatch()
        const worker=useSelector((state)=>{
            console.log(state.worker)
        return state.worker.detials
    
      });
      console.log(worker)

      async function handleLogout(){
        if(window.confirm("are You sure")){
          await axios.get("/worker/auth/logout")
          dispatch({type:"refresh"})
        }
      }
  return (
    <div> 
    
    <div className="container workerData">
    <div className="workerProfile">
    <div className="image">
    <img src="https://img.freepik.com/free-photo/smiling-auto-mechanic-with-wrench-standing-hands-folded-white-background_662251-2939.jpg?w=2000"/>
    </div>
    <div className="workerDetials">
    <h4>{worker.name}</h4>
    <p>{worker.email}</p>
    <p> Service Center:{worker.serviceCenter}</p>
    </div>
    <div className="btn">
    <button onClick={handleLogout}>Logout</button>
    <Link to={'worker/edit-profile/'+worker._id}>
    <button>edit profile</button>
    </Link>
    </div>
    </div>
    </div>
    
    </div>
  )
}

export default WorkerProfile