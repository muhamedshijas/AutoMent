import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
    <div>AdminViewServiceCente
    
    <h1>{serviceCenter.name}</h1>
    <img src={serviceCenter.url?serviceCenter.url:serviceCenter.secure_url} alt="" srcset="" />
    </div>

  )
}

export default AdminViewServiceCenter