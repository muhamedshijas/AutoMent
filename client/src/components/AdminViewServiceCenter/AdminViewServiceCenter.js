import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './AdminViewServiceCenter.css'

function AdminViewServiceCenter({id}) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const [serviceCenter ,setServiceCenter]=useState("")
    const [refresh, setRefresh] = useState(false)
    useEffect(()=>{
       (async function(){
        let {data}=await axios.get("/admin/viewservicecenter/" +id)
        
        if(!data.err){
          console.log(data)
          setServiceCenter(data)
      }
       })()
    },[refresh])

    async function acceptRequest(id){
      console.log(id)
      if(window.confirm("are You sure")){
        await axios.patch("/admin/serviceCenter/acceptrequest",{id})
        dispatch({type:"refresh"})
        return navigate("/admin/serviceCenter")
      }
     }
  return (
    
  <div className="section container">
    <div className="serviceCenter">
    <h3 className='text-center'>Service Center detials</h3>
    <p>Name:{serviceCenter.name}</p>
    <p>Place:{serviceCenter.place}</p>
    <p>District:{serviceCenter.district}</p>
    <p>PhoneNo</p>
    <p>Certificate</p>
    <img src="https://res.cloudinary.com/dv5bvojzi/image/upload/v1683726867/Automent/xgcucze6dtbiipj193uo.png" alt="" />
    <div className="permission">
    <button onClick={()=>acceptRequest(serviceCenter._id)}>Accept</button>
    <Link to='/admin/requests'>
    <button className='reject'>Cancel</button>
    </Link>
    </div>
    </div>
  </div>
  )
}

export default AdminViewServiceCenter