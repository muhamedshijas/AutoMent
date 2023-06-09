import axios from 'axios'
import React, { useState } from 'react'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading';

function AdminServiceCenter() {
    const [serviceCenterList, setServiceCenterList] = useState([""])
  const [refresh, setRefresh] = useState(false)
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(true);

  async function blockServiceCenter(id){
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
        await axios.patch("/admin/servicecenter/block",{id})
  setRefresh(!refresh)
      }
    })
  }
 

  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/admin/serviceCenter?name="+name)
                console.log(data)
                if(!data.err){
                 
                    setServiceCenterList(data)
                }
            }
            catch(err){   
                console.log(err)
        } finally {
          setIsLoading(false); // Set loading to false after fetching data
        }
        }
    )()
  },[refresh,name])

  return (
    <div className="">
    {
      isLoading?<div className="admin-loading"> <ReactLoading type="spinningBubbles" color="#2C457E" height={80} width={80} /></div>:<div className="app d-flex">
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
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td> <button   onClick={()=>blockServiceCenter(item._id)}>Block</button> </td>
            </tr>
        })
    }
  </tbody>
</table>
    </div>
    </div>
  }
      </div>

  )
}

export default AdminServiceCenter