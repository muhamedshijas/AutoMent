import axios from 'axios'
import React, { useState } from 'react'
import './AddCustomService.css'

function AddCustomService({setShowModal, setRefresh,addService,refresh}) {
  const [name,setName]=useState("")
  const [serviceList,setServiceList]=useState([""])


  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/admin/service?name")
                console.log(data)
                if(!data.err){
                    setServiceList(data)
                }
            }
            catch(err){   
                console.log(err)
        }
        }
    )()
  },[refresh])

   async function handleSubmit(){
    addService(name)
        setShowModal(false)
    }
  return (
   
    <div className="app">
 <div className="add-custom-service">
 <form action="" onSubmit={handleSubmit}>
 <h5>Add a Services</h5>
     <select name="" id="" onChange={(e)=>setName(e.target.value)}>
     <option value="">Choode one</option>
    {
      serviceList.map((item)=>{
        return<option value={item.serviceName}>{item.serviceName}</option>
      })
    }
    </select>
    <button type='submiit'>Save</button>
 </form>
 </div>
    </div>

  )
}

export default AddCustomService