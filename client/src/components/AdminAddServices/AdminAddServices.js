import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './AdminAddService.css'
function AdminAddServices() {

    const [services,setServices]=useState("")
    const [errMessage,setErrMessage]=useState("")
    const dispatch =useDispatch()
    const navigate=useNavigate()

    function validationErr(){
        if(services.replaceAll(' ', "")===""){
          console.log("hiii")
            return true
        }
        return false
      }
      async function handleSubmit(e) {
        e.preventDefault();
        if (!validationErr()) {
          let {data}=await axios.post("/admin/addservice", {
            services
          });
          console.log(data)
          if(!data.error){
              dispatch({type:"refresh"})
              return navigate("/admin/service")
          }else{
            setErrMessage(data.message)
          }
        }
      }
    return (
    <div className="add-service-page">
    
   
    <form action="" onSubmit={handleSubmit}>
    <h5>Add Services</h5>
    <div className="addService">
    <input type="text" placeholder='Add new Service' value={services} onChange={(e)=>setServices(e.target.value)} />
        <button type='submit'> Add</button>
    </div>
    </form>
    </div>
  )
}

export default AdminAddServices