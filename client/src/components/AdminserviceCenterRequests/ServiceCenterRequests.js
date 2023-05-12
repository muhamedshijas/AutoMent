import axios from 'axios'
import React, { useState } from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import { Link } from 'react-router-dom'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import './ServiceCenter.css'

function ServiceCenterRequests() {

    const [serviceCenterList, setServiceCenterList] = useState([""])
  const [refresh, setRefresh] = useState(false)
  const [name, setName] = useState("")

  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/admin/requests?name="+name)
                console.log(data)
                if(!data.err){
                 
                    setServiceCenterList(data)
                }
            }
            catch(err){   
                console.log(err)
        }
        }
    )()
  },[refresh,name])

  return (
    <div className="app d-flex">
    <AdminSideBar/>

    <div className="section container">
    <div className="admin-search-box">
    <input type="text" placeholder='Search...' value={name} onChange={(e) => setName(e.target.value)} />
    <button>search</button>
  </div>
    
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
        serviceCenterList.map((item,index)=>{
            return <tr key={index}>
            <td>{index+1}</td>
            <td>{item.place}</td>
            <td>{item.email}</td>
            <Link to={'/admin/servicecenterdetials/'+item._id}>
            <td>view detials</td>
            </Link>
            </tr>
        })
    }
  </tbody>
</table>
    </div>
    </div>
  )
}

export default ServiceCenterRequests