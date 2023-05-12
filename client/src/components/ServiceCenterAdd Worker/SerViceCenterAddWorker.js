import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ServiceCenterAddWorker.css'
function SerViceCenterAddWorker() {
    const dispatch=useDispatch()
  const serviceCenter=useSelector((state)=>{
      return state.serviceCenter
    });
    console.log(serviceCenter)
  const [name,setName]=useState("")
  const [mobileNO,setMobileNo]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const [errMessage,setErrMessage]=useState("")
  const navigate= useNavigate()
  function validationErr() {
    if (
      email.replaceAll(" ", "") === "" ||
      password.replaceAll(" ", "") === "" ||
      mobileNO.replaceAll(" ", "") === "" ||
      name.replaceAll(" ", "") === ""
    ) {
      return true;
    }
    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validationErr()) {
      let {data}=await axios.post("/servicecenter/addworker", {
        name, email, password, mobileNO,_id:serviceCenter.details._id
      });
      console.log(data)
      if(!data.error){
          return navigate("/servicecenter/workers")
          dispatch({type:"refresh"})
      }else{
        setErrMessage(data.message)
      }
    }
  }

  return (
    <div>
    <div className="container d-flex justify-content-center align-items-center">
    <div className="addWorker">
    
    
    <form action="" onSubmit={handleSubmit}>
    <h3 className="text-center">Add Worker</h3>
    <div className="servicecenterId field">
    <label htmlFor="" >ServiceCenterId 
    </label>
    <input type="text" value={serviceCenter.details._id} disabled />
    </div>
  
    <div className="worker-name field">
    <label htmlFor="" >Worker Name
    </label>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
    </div>
    <div className="email field">
    <label htmlFor="" >email
    </label>
    <input type="email" onChange={(e)=>setEmail(e.target.value)} />
    </div>
    <div className="mobileNo field">
    <label htmlFor="" >mobileNO
    </label>
    <input type="text" onChange={(e)=>setMobileNo(e.target.value)}  />
    </div>
    <div className="password field">
    <label htmlFor="" >Password
    </label>
    <input type="text" onChange={(e)=>setPassword(e.target.value)}  />
    </div>
    <button type='submit'> Add </button>
    </form>
    </div>
    </div>
    </div>
  )
}

export default SerViceCenterAddWorker