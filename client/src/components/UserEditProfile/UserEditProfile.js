import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { loginImage } from '../images/Images'
import './UserEditProfile.css'

function UserEditProfile() {
    const [name, setName] = useState("");
  const [proffession, setProffession] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo,setMobileNo]=useState("")
  const [errMessage, setErrMessage]=useState(null)
  const navigate= useNavigate()
  function validationErr() {
    if (
      email.replaceAll(" ", "") === "" ||
      name.replaceAll(" ", "") === "" 
    ) {
        console.log("hellooo")
      return true;
    }
    console.log("nnnnn")
    return false;
  }
  const {id}=useParams()


  async function handleSubmit(e) {
    console.log("hiii")
    e.preventDefault();
    if (!validationErr()) {
      let {data}=await axios.post("/edit-profile", {
        name, email,  mobileNo,id
    });
    console.log(data)
      if(!data.error){
          return navigate("/profile")
      }else{
        setErrMessage(data.message)
      }
    }
  }

    useEffect(()=>{
        (async function(){
            let {data}=await axios.get('/edit-profile/'+id)
            setName(data.name)
            setEmail(data.email)
            setMobileNo(data.mobileNo)
        })()
    },[])
  return (
    <div className='container'>
    <div className="edit-form">
    <div className="image">
    <img src={loginImage} alt="" srcset="" />
    </div>
    <form action="" onSubmit={handleSubmit}>
    <h4>edit profile</h4>
    <div className="name">
    <label htmlFor="">Name</label>
    <input type="text"  onChange={(e)=>setName(e.target.value)}   value={name}/>
    </div>
    <div className="email">
    <label htmlFor="">Email</label>
    <input type="email" onChange={(e)=>setEmail(e.target.value)}  value={email}/>
    </div>
    <div className="name">
    <label htmlFor="">Phone No</label>
    <input type="text"  onChange={(e)=>setMobileNo(e.target.value)} value={mobileNo} />
    </div>
    
    <button type='submit'>Submit</button>
    </form>
    
    </div>
   
    </div>
  )
}

export default UserEditProfile