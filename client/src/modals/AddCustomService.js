import axios from 'axios'
import React, { useState } from 'react'
import './AddCustomService.css'

function AddCustomService({setShowModal, setRefresh, refresh}) {
  const [name,setName]=useState("")
  const [serviceList,setServiceList]=useState([""])


  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/admin/service?name="+name)
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
  },[refresh,name])

   async function handleSubmit(){
        setShowModal=false
    }
  return (
   
    <div className="app">
    <div className="add-custom-service">
    <form action="" onSubmit={handleSubmit}>
    <h4>Add Another Service</h4>
    <select name="" id="">
    {
      serviceList.map((item,index)=>{
          return<option value="">{item.serviceName}</option>
        })
      }
      </select>
      <button type='submit'>Submit</button>
      </form>
      </div>
    </div>

  )
}

export default AddCustomService