import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { loginImage } from '../images/Images'
import '../UserEditProfile/UserEditProfile.css'

function WorkerEditProfile() {
    const dispatch=useDispatch()
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo,setMobileNo]=useState("")
  const [errMessage, setErrMessage]=useState(null)
  const navigate= useNavigate()
    const {id}=useParams()
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
  async function handleSubmit(e) {
    console.log("hiii")
    e.preventDefault();
    if (!validationErr()) {
      let {data}=await axios.post("/worker/edit-profile", {
        name, email,  mobileNo,id
    });
    console.log(data)
      if(!data.error){

          dispatch({type:"refresh"})
          return navigate("/worker/profile")
      }else{
        setErrMessage(data.message)
      }
    }
  }

  

    useEffect(()=>{
        (async function(){
            let {data}=await axios.get('/worker/edit-profile/'+id)
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
    <h4>Edit worker profile</h4>
    <div className="name">
    <label htmlFor="">Name</label>
    <input type="text"  onChange={(e)=>setName(e.target.value)}   value={name}/>
    </div>
    <div className="email">
    <label htmlFor="">Email</label>
    <input type="email" onChange={(e)=>setEmail(e.target.value)}  value={email}/>
    </div>

    <button type='submit'>Submit</button>
    </form>
    
    </div>
   
    </div>
  )
}

export default WorkerEditProfile