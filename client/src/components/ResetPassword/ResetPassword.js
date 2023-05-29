import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UpdatePassword from '../../assets/images/UpdatePassword.png'



function ResetPassword({email,otp}) {
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("")
    const [errMessage,setErrMessage]=useState("")
    const navigate= useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        
        const {data}= await axios.post("/user/auth/forgot/reset", {otp, email, password});
        if(data.err){
            setErrMessage(data.message)
        }else{
            navigate("/login")
        }
    }

    const validForm=()=>{
        if(password.trim()==="" || password!=confirmPassword){
            return false
        }
        return true
    }

  return (
    <div>
    <div className="forgot-container">
    <div className="forgot-otp">
    <div className="image">
    <img src={UpdatePassword} alt="" srcset="" />
    </div>
    <div className="forgot-form">
    <form action="" className='reset-form' onSubmit={handleSubmit}>
    <input type="text" value={email} disabled />
    <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="new password" />
    <input type="password" value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)} placeholder=" confirm new password" />
    {
        errMessage &&
        <div className="login-row" style={{ justifyContent: "flex-start" }}>
        <p className='text-danger'>{errMessage}</p>
        </div>
    }
     <button type='submit' disabled={!validForm()}>Submit</button>
     </form>
     </div>
     </div>
     
     </div>
    </div>
  )
}

export default ResetPassword