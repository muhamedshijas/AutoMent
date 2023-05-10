import axios from 'axios'
import React, { useState } from 'react'
import AdminSideBar from '../AdminSideBar/AdminSideBar'

function Adminusers() {

  const [usersList, setUsersList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [name, setName] = useState("")

  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/admin/users?name="+name)
                if(!data.err){
                    console.log(data)
                    setUsersList(data.users)
                }
            }
            catch(err){   
                console.log(err)
        }
        }
    )()
  },[refresh])
  return (
    <div className="app d-flex justify-content-between">
    <AdminSideBar/>

    <div className="section container">
    
    
    <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    {
        usersList.map((item,index)=>{
            return <tr key={index}>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            </tr>
        })
    }
  </tbody>
</table>
    </div>
    </div>
  )
}

export default Adminusers