import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import forget from '../../assets/images/forget.png'
import UserForgetOtp from '../UserForgetOtp/UserForgetOtp'
import './UserForget.css'


function UserForget() {



    const[email,setEmail]=useState("")
    const [otp,setOtp]=useState(false)
    const [errMessage,setErrMessage]=useState("")

    const validForm = () => {
        if (email.trim() === "") {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validForm()) {
            const { data } = await axios.post("/user/auth/forgot", {email})
            if(data.err){
                setErrMessage(data.message)
            }else{
                console.log(data.user)
                setOtp(true)
            }
        }
    }
  return (
    <div className='forgot-container'>
   {
    otp?<UserForgetOtp email={email}/>:
    <div className='forgot-otp'>
    <div className="forget-image">
    <img src={forget} alt="" srcset=""  />
    </div>
    <form action="" onSubmit={handleSubmit} className='forget-from'>
    <label htmlFor="">Enter your Email</label>
    <input type="email " value={email} onChange={(e)=>setEmail(e.target.value)} />
    <button type='submit'>Submit</button>
    </form>
    </div>
   }
 

   </div>
  )
}

export default UserForget