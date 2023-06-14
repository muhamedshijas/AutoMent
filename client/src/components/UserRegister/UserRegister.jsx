import React, { useState } from 'react'
import { loginImage } from '../images/Images'
import '../AdminLogin/adminLogin.css'
import './UserRegister.css'
import { useDispatch } from 'react-redux';
import VerifyOtp from '../VerifyOtp/VerifyOtp.js'
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserRegister() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [errMessage, setErrmessage] = useState("");
    const [showOtpPage, setShowOtpPage] = useState(false)
    const dispatch = useDispatch()
    const validForm = () => {
        if (name.trim() === "" || password.trim() === "" || email.trim() === "" || password !== confirmPassword) {
            return false
        }
        return true
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (validForm()) {
            console.log("hjuiuu");
            let { data } = await axios.post("/user/auth/signUp", { email })
            console.log(data);
            if (!data.error) {
                dispatch({ type: "refresh" })
                setShowOtpPage(true)
            } else {
                setErrmessage(data.message)
            }
        }
    }

    return (
        <section className='d-flex justify-content-evenly align-items-center loginSection '>
            {
                !showOtpPage ?

                    <div className="login row w-75 ">
                        <div className="image col-md-7">
                            <h3>User SignUp </h3>
                            <img src={loginImage} alt="" srcset="" />
                        </div>
                        <form onSubmit={handleSubmit} className="form col-md-4">
                            <label className="form-label text-danger" htmlFor="form2Example27">
                                {errMessage && errMessage}
                            </label>

                            <div className="name">
                                <label htmlFor=""><p> Name</p></label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="email">
                                <label htmlFor=""><p> Email</p></label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="phone">
                                <label htmlFor=""><p className='text-left'> Phone No</p></label>
                                <input type="tel" pattern='[0-9]{3}[0-9]{3}[0-9]{4}' value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
                                <p className='text-success text-center' style={{ fontWeight: '400', fontSize: '12px' }}>(Phone number must contain 10 numbers)</p>
                            </div>

                            <div className="password">
                                <label htmlFor=""><p> Password</p></label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="password">
                                <label htmlFor=""><p> Confirm Password</p></label>
                                <input type="password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
                            </div>
                            <button type='submit' disabled={!validForm()} className='loginSubmit'>Submit</button>
                            <p>Do you have an account </p>
                            <Link to='/login'>Login here</Link>
                        </form>
                    </div>
                    : <VerifyOtp data={{ name, email, password, mobileNo }} />

            }
        </section>
    )
}

export default UserRegister