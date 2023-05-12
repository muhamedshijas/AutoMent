import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './AdminViewServiceCenter.css'

function AdminViewServiceCenter({id}) {
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
    <button>Accept</button>
    <button className='reject'>Cancel</button>
    </div>
    </div>
  </div>
  )
}

export default AdminViewServiceCenter