import axios from 'axios';
import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginImage } from '../images/Images'
import '../AdminLogin/adminLogin.css'
function WorkerLogin() {
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
  e.preventDefault();
  if(!validationErr()){
    let {data}=await axios.post('/worker/auth/login',{email,password})
    console.log(data);
    if(!data.err){
      dispatch({type:"refresh"})
    }else{
      console.log(data.message)
      setErrmessage(data.message)

    }
  }
}

  return (
    <section className='d-flex justify-content-evenly align-items-center loginSection '>
    <div className="login row w-75 ">
    <div className="image col-md-7">
    <h3>worker Login </h3>
    <img src={loginImage} alt="" srcset="" />
    </div>
    <form onSubmit={handleSubmit} className="form col-md-4">
    <label className="form-label text-danger" htmlFor="form2Example27">
    {errMessage && errMessage}
  </label>
    <div className="email">
    <label htmlFor=""><p> email</p></label>
    <input type="text"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </div>
    <div className="password">
    <label htmlFor=""><p> password</p></label>
    <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
    </div>
    <button type='submit' className='loginSubmit'>Submit</button>

    </form>
    </div>
    </section>
  )
}

export default WorkerLogin