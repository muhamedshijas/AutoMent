import axios from 'axios';
import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginImage } from '../images/Images'
import '../AdminLogin/adminLogin.css';
import { Link } from 'react-router-dom';
import './UserLogin.css'
function UserLogin() {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [errMessage,setErrmessage]=useState("");
const dispatch=useDispatch();
function validationErr(){
  
  if(email.replaceAll(' ', "")==="" || password.replaceAll(' ',"")===""){
      return true
  }
  return false
}
async function handleSubmit(e){
  console.log("hii")
  e.preventDefault();
  if(!validationErr()){
    let {data}=await axios.post('/user/auth/login',{email,password})
    console.log(data);
    if(!data.error){
      dispatch({type:"refresh"})
    }else{
      setErrmessage(data.message)
    }
  }
}

  return (
    <section className='d-flex justify-content-evenly align-items-center loginSection '>
    <div className="login row w-75 ">
    <div className="image col-md-7">
    <h3>User Login </h3>
    <img src={loginImage} alt="" srcset="" />
    </div>
    <form onSubmit={handleSubmit} className="form col-md-4">
    <label className="form-label text-danger" htmlFor="form2Example27">
    {errMessage && errMessage}
  </label>
    <div className="email">
    <label htmlFor=""><p> Email</p></label>
    <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </div>
    <div className="password">
    <label htmlFor=""><p> Password</p></label>
    <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
    </div>
    <button type='submit' disabled={validationErr()} className='loginSubmit'>Login</button>
    <Link to='/forgetpassword'>Forget password</Link>
      <p>Don't you have an account </p>
      <Link to='/signup'>Signup here</Link>
    </form>

    </div>
    </section>
  )
}

export default UserLogin