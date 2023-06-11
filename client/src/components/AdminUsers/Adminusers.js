import axios from 'axios'
import React, { useState } from 'react'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import './AdminUsers.css'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading';


function Adminusers() {

  const [usersList, setUsersList] = useState([""])
  const [refresh, setRefresh] = useState(false)
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/admin/users?name="+name)
                console.log(data)
                if(!data.err){
                    console.log(data)
                    setUsersList(data)
                }
            }
            catch(err){   
                console.log(err)
        }finally {
          setIsLoading(false); // Set loading to false after fetching data
        }
        }
    )()
  },[refresh,name])

 async function blockUser(id){
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
      await axios.patch("/admin/users/block",{id})
      setRefresh(!refresh)
    }
  })

 }

 async function unBlockUser(id){
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
      await axios.patch("/admin/users/unblock",{id})
      setRefresh(!refresh)
    }
  })
}
  
  
  return (
    <div className="app">
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
        usersList.map((item,index)=>{
            return <tr key={index} className={item.block?"blocked":""}>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.block? <button className="blockButton" onClick={()=>unBlockUser(item._id)}>UnBlock</button>: <button onClick={()=>blockUser(item._id)}>Block</button>}</td>
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

export default Adminusers