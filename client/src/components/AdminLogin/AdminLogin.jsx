import axios from 'axios';
import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginImage } from '../images/Images'
import { ClipLoader } from 'react-spinners';

import './adminLogin.css';
function AdminLogin() {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [errMessage,setErrmessage]=useState("");
const dispatch=useDispatch();
const [loading, setLoading] = useState({
        submit: false
    })
function validationErr(){
  if(email.replaceAll(' ', "")==="" || password.replaceAll(' ',"")===""){
    console.log("hiii")
      return true
  }
  return false
}
async function handleSubmit(e){
  console.log("hii")
  e.preventDefault();
  setLoading({ ...loading, submit: true })
  
    let {data}=await axios.post('/admin/auth/login',{email,password})
    console.log(data);
    if(!data.error){
      dispatch({type:"refresh"})
      alert("logged in")
    }else{
      setErrmessage(data.message)
    }
    setLoading({ ...loading, submit: false })
}

  return (
    <section className='d-flex justify-content-evenly align-items-center loginSection '>
    <div className="login row w-75 ">
    <div className="image col-md-7">
    <h3>Admin Login </h3>
    <img src={loginImage} alt="" srcset="" />
    </div>
    <form onSubmit={handleSubmit} className="form col-md-4">
    <label className="form-label text-danger" htmlFor="form2Example27">
    {errMessage && errMessage}
  </label>
    <div className="email">
    <label htmlFor=""><p> Email</p></label>
    <input type="text"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </div>
    <div className="password">
    <label htmlFor=""><p> Password</p></label>
    <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
    </div>
    <button type='submit' disabled={validationErr()}   className='loginSubmit'>Login
    <ClipLoader size={20} color="white" loading={loading.submit} />
    </button>

    </form>
    </div>
    </section>
  )
}

export default AdminLogin