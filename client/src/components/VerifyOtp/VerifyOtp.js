import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { verfyOtp } from '../images/Images.jsx'
import './verifyOtp.css'

function VerifyOtp(props) {
  const [otp, setOtp] = useState("")
  const [errMessage,setErrMessage]=useState("")
  const dispatch=useDispatch()

  async function handleSubmit(e) {
        e.preventDefault();
        let { data } = await axios.post("/user/auth/register/verify", { otp, ...props.data });
        if (data.err) {
            setErrMessage(data.message)
        } else {
            dispatch({ type: "refresh" })
        }
    }


  return (
    <div className="container d-flex justify-content-center align-items-center">
      <section>
        <div className="image">
          <img src={verfyOtp} alt="" srcset="" />
        </div>

        <form action="" className='otp-form' onSubmit={handleSubmit}>
          <div className="heads">
            <h3 className='text-center'>Enter the Otp</h3>
            <b>that we have sent to your email</b>
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
      </section>
    </div>
  )
}

export default VerifyOtp