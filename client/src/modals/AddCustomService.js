import axios from 'axios'
import React, { useState } from 'react'
import './AddCustomService.css'
import { RiCloseLine } from "react-icons/ri";
function AddCustomService({setShowModal, setRefresh,addService,refresh}) {
  const [name,setName]=useState("")
  const [errMessage,setErrMessage]=useState("");
  const [serviceList,setServiceList]=useState([""])

  async function handleClose(){
    setShowModal(false)
  }
  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("user/getservice")
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
    if(name==null){
      setErrMessage("select aservice")
    }else{
      addService(name)
        setShowModal(false)
    }
   
    }
  return (
   
    <div className="ac-service">
 <div className="add-custom-service">
 <form action="" onSubmit={handleSubmit}>
 <div className="close">
 <RiCloseLine onClick={handleClose}/>
 </div>
 <h5>Add a Services</h5>
 <label className="form-label text-danger" htmlFor="form2Example27">
    {errMessage && errMessage}
  </label>
     <select name="" id="" onChange={(e)=>setName(e.target.value)}>
     <option value="">Choose One</option>
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