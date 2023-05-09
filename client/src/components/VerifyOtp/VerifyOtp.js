import React from 'react'
import { verfyOtp } from '../images/Images.jsx'
import './verifyOtp.css'

function VerifyOtp() {

    
  return (
    <div className="container d-flex justify-content-center align-items-center">
    <section>
    <div className="image">
    <img src={verfyOtp} alt="" srcset="" />
    </div>
    
    <form action="" className='otp-form'>
    <div className="heads">
    <h3 className='text-center'>Enter the Otp</h3>
    <b>that we have sent to your email</b>
    </div>
    <input type="text" />
    <button>Submit</button>
    </form>
    </section> 
    </div>
    )
}

export default VerifyOtp