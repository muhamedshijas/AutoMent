import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginImage } from '../images/Images'
import '../AdminLogin/adminLogin.css'
import './ServiceCenterSignUp.css'
import { Link, useNavigate } from 'react-router-dom';
function ServiceCenterSignUp() {
  const [email, setEmail] = useState("");
  const [name,setName]=useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState("")
  const [errMessage, setErrmessage] = useState("");
  const [place, setPlace] = useState("");
  const [district, setDistrict] = useState("")
  const [certificate, setCertificate] = useState(null)
  const [image, setImage] = useState(null)
  const [finalImage,setFinalImage]=useState(null)
  const [finalLogo,setFinalLogo]=useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const isValidFileUploaded = (file) => {
    const validExtensions = ['png', 'jpeg', 'jpg']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }

  const handleImage=(e)=>{
        if(isValidFileUploaded(e.target.files[0])){
            setImage(e.target.files[0])
            setErrmessage("")
            ImageTOBase(e.target.files[0])
        }else{
            setErrmessage("Invalid File type")
        }
    }
    const handleLogo=(e)=>{
        if(isValidFileUploaded(e.target.files[0])){
            setImage(e.target.files[0])
            setErrmessage("")
            LogoTOBase(e.target.files[0])
        }else{
            setErrmessage("Invalid File type")
        }
    }

    const ImageTOBase=(file)=>{
      const reader= new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setFinalImage(reader.result)
      }
    }

    const LogoTOBase=(file)=>{
      const reader= new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setFinalLogo(reader.result)
      }
    }

  const validForm = () => {
    if (place.trim() === "" || password.trim() === "" || email.trim() === "" || district.trim() === "" || name.trim==="" ||password !== confirmPassword) {
      return false
    }
    return true
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (validForm()) {
      alert("hsfhsdjf")
      let { data } = await axios.post("/serviceCenter/auth/signUp", {
    email,name, password, place, district, certificate:finalImage,logo:finalLogo,
      })

      if (!data.error) {
        console.log(data)
        dispatch({ type: "refresh" })
        
      } else {
        setErrmessage(data.message)
      }
    }
  }

  return (
    <div className="service-signup">
    
    <div className="image">
    <img src={loginImage} alt="" srcset="" />
    </div>

    <form onSubmit={handleSubmit} >
    <div className="first-row">
    <div className="email">
    <label htmlFor="">Email</label>
    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
    </div>
    <div className="name">
    <label htmlFor="">Service center Name</label>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
    </div>
    </div>

    <div className="first-row">
    <div className="email">
    <label htmlFor="">
    Enter the place</label>
    <input type="text" value={place}  onChange={(e)=>setPlace(e.target.value)} />
    </div>
    <div className="email">
    <select onChange={(e)=>setDistrict(e.target.value)} >
    <option value="">Choose District</option>
  <option value="Thiruvanathapuram">Thiruvanathapuram</option>    
  <option value="Kollam">Kollam</option>    
  <option value="Pathanamthitta">Pathanamthitta</option>    
  <option value="Idukki">Idukki</option>    
  <option value="Kottayam">Kottayam</option>    
  <option value="Alappuzha">Alappuzha</option>    
  <option value="Ernamkulam">Ernamkulam</option>    
  <option value="Thrissur">Thrissur</option>    
  <option value="Palakkad">Palakkad</option>    
  <option value="Malappuram">Malappuram</option>    
  <option value="Kozhikode">Kozhikode</option>    
  <option value="Wayanad">Wayanad</option>    
  <option value="Kannur">Kannur</option>    
  <option value="Kasargode">Kasargode</option>    
    </select>
    </div>
    </div>

  <div className="first-row">
  <div className="email">
  <label htmlFor="">Password</label>
  <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div>

  <div className="email">
  <label htmlFor="">Confirm Password</label>
  <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
  </div>
  </div>    

  <div className="first-row">
  <div className="email logos">
  <label htmlFor="">Upload Logo</label>
  <input type="file" onChange={handleLogo}/>
  </div>

  <div className="email logos">
  <label htmlFor="">Upload registration certificat</label>
  <input type="file" onChange={handleImage} />
  </div>
  </div>
  <button type='submit' disabled={!validForm()}> Submit </button>
    </form>
    </div>
  )
}

export default ServiceCenterSignUp