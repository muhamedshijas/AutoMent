import React, { useState } from 'react'
import './ServiceCenterWorkers.css'
import Swal from 'sweetalert2'
import ServiceCenterSideBar from '../ServiceCenterSideBar/ServiceCenterSideBar'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ServiceCenterWorkers() {
  const [workersList, setWorkersList] = useState([""])
  const [refresh, setRefresh] = useState(false)
  const [name, setName] = useState("")

  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/servicecenter/workers?name="+name)
                console.log(data)
                if(!data.err){
                    console.log(data)
                    setWorkersList(data)
                }
            }
            catch(err){   
                console.log(err)
        }
        }
    )()
  },[refresh,name])

  async function blockWorker(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "Accept this request",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2C457E',
      cancelButtonColor: ' #9BA4B5',
      confirmButtonText: 'Yes, Sure!'
    }).then(async (result) => {
      if (result.isConfirmed) {
       await axios.patch("/servicecenter/workers/block",{id})
  setRefresh(!refresh)
      }
    })
   }

   async function unBlockWorker(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "Accept this request",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2C457E',
      cancelButtonColor: ' #9BA4B5',
      confirmButtonText: 'Yes, Sure!'
    }).then(async (result) => {
      if (result.isConfirmed) {
       await axios.patch("/servicecenter/workers/unblock",{id})
  setRefresh(!refresh)
      }
    })
  }
  
  return (
    <div className="app d-flex">
    <ServiceCenterSideBar/>
    <div className="container">
    <table class="table striped mt-5" >
  <thead className="thead-dark">
    <tr className="table-head">
      <th scope="col">SI No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>


  </thead>
  <tbody>
    {
        workersList.map((item,index)=>{
            return <tr key={index} className={item.block?"blocked":""}>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.block? <button className="blockButton" onClick={()=>unBlockWorker(item._id)}>UnBlock</button>: <button onClick={()=>blockWorker(item._id)}>Block</button>}</td>
            </tr>
        })
    }
  </tbody>
  
</table>

<div className="addWorkers d-flex justify-content-center align-items-center">
<Link to ='/serviceCenter/addWorkers'>
<button> Add Workers</button>
</Link>
</div>
    </div>
    </div>
  )
}

export default ServiceCenterWorkers