import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import AdminSideBar from '../AdminSideBar/AdminSideBar'

function AdminServices() {
  const [workersList, setWorkersList] = useState([""])
  const [refresh, setRefresh] = useState(false)
  const [name, setName] = useState("")

  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/admin/service?name="+name)
                console.log(data)
                if(!data.err){
                    setWorkersList(data)
                }
            }
            catch(err){   
                console.log(err)
        }
        }
    )()
  },[refresh,name])

  async function deleteService(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "Block this service center",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2C457E',
      cancelButtonColor: ' #9BA4B5',
      confirmButtonText: 'Yes, Sure!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete("/admin/deleteservice?id="+id)
         setRefresh(!refresh)
      }
    })
  }
  
  return (
    <div className="app d-flex">
    <AdminSideBar/>
    <div className="container">
    <table class="table striped mt-5" >
  <thead className="thead-dark">
    <tr className="table-head">
      <th scope="col">SI No</th>
      <th scope="col">Service Name</th>
      <th scope="col">Action</th>
    </tr>


  </thead>
  <tbody>
    {
        workersList.map((item,index)=>{
            return <tr>
            <td>{index+1}</td>
            <td>{item.serviceName}</td>
            <td><button onClick={()=>deleteService(item._id)}>Delete</button></td>
            </tr>
        })
    }
  </tbody>
  
</table>

<div className="addWorkers d-flex justify-content-center align-items-center">
<Link to ='/admin/addServices'>
<button> Add Services</button>
</Link>
</div>
    </div>
    </div>
  )
}

export default AdminServices