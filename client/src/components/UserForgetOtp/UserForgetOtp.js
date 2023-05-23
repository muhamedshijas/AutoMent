import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import ResetPassword from '../ResetPassword/ResetPassword'

function UserForgetOtp({email}) {
    const [otp,setOtp]=useState()
    const [errMessage,setErrMessage]=useState("")
    const [reset,setReset]=useState(false)
     async function handleSubmit(e) {
        e.preventDefault();
        const {data}= await axios.post("/user/auth/forgot/verify", {otp});
        console.log(data)
        if(data.err){
            setErrMessage(data.message)
        }else{
            setReset(true)
            alert("passss")
        }

    }
  return (
    <div>
    <div className="container">
   

   {
    reset?<ResetPassword otp={otp} email={email}/>
    :<div className="app"> 
    <div className="image">
    
    </div>
    <form action="" className='otp-form' onSubmit={handleSubmit}>
          <div className="heads">
            <h3 className='text-center'>Enter the Otp</h3>
            <b>that we have sent to {email}</b>
          </div>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          {
            errMessage &&
            <div className="login-row" style={{ justifyContent: "flex-start" }}>
            <p className='text-danger'>{errMessage}</p>
            </div>
        }
          <button type='submit'>Submit</button>
          </form>
    </div>
   }
    
    
    </div>
          </div>
  )
}

export default UserForgetOtp