import axios from 'axios';
import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginImage } from '../images/Images'
import '../AdminLogin/adminLogin.css'
import { useNavigate } from 'react-router-dom';
function ServiceCenterSignUp() {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [errMessage,setErrmessage]=useState("");
const [logo,setLogo]=useState("");
const [place ,setPlace]=useState("");
const [district ,setDistrict]=useState("")
const [certificate,setCertificate]=useState("")
const dispatch=useDispatch();
const navigate =useNavigate();

function validationErr(){
  
  if(email.replaceAll(' ', "")==="" || password.replaceAll(' ',"")===""|| place.replaceAll('',"")==""||district.replaceAll('',"")==""){
      return true
  }
  return false
}
async function handleSubmit(e){
  console.log("hii")
  e.preventDefault();
  if(!validationErr()){
    let {data}=await axios.post('/serviceCenter/auth/signup',{email,password})
    console.log(data);
    if(!data.error){
      dispatch({type:"refresh"})
      alert("logged in")
    }else{
      setErrmessage(data.message)
    }
  }
}

  return (
    <section className='d-flex justify-content-evenly align-items-center loginSection '>
    <div className="login row w-75 ">
    <div className="image col-md-7">
    <h3>Service center signUp </h3>
    <img src={loginImage} alt="" srcset="" />
    </div>
    <form onSubmit={handleSubmit} className="serviceCenterSignUp col-md-4">
    <label className="form-label text-danger" htmlFor="form2Example27">
    {errMessage && errMessage}
  </label>
    <div className="email">
    <label htmlFor=""><p> email</p></label>
    <input type="text"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </div>
    <div className="email">
    <label htmlFor=""><p> place</p></label>
    <input type="text"  value={place} onChange={(e)=>setPlace(e.target.value)}/>
    </div>
    <div className="email">
    <label htmlFor=""><p> district</p></label>
    <input type="text"  value={district} onChange={(e)=>setDistrict(e.target.value)}/>
    </div>
    <div className="password">
    <label htmlFor=""><p> password</p></label>
    <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
    </div>
    <div className="logos">
    <div className="logo">
    <label htmlFor=""> Add Logo</label>
    <input type="file" value={logo} onChange={(e)=>setLogo(e.target.value)} className="chooseImage"/>
    </div>
    <div className="certificate">
    <label htmlFor=""> Add Certificate</label>
    <input type="file" value={certificate} onChange={(e)=>setCertificate(e.target.value)} className="chooseImage"/>
    </div>
    </div>
    <button type='submit' className='loginSubmit'>Submit</button>

    </form>
    </div>
    </section>
  )
}

export default ServiceCenterSignUp