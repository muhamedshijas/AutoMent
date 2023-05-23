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
    if (place.trim() === "" || password.trim() === "" || email.trim() === "" || district.trim() === "" || name.trim==="") {
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
            <label htmlFor=""><p> Name</p></label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="email">
            <label htmlFor=""><p> email</p></label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="email">
            <label htmlFor=""><p> place</p></label>
            <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
          </div>
          <div className="email">
          <select name="" id="" onChange={(e)=>setDistrict(e.target.value)}>
          <option value="">Choose District</option>
          <option value="Thiruvananthapuram">Thiruvananthapuram</option>
          <option value="Kollam">Kollam</option>
          <option value="Pathanamthitta">Pathanamthitta</option>
          <option value="Alappuzha">Alappuzha</option>
          <option value="Kottayam">Kottayam</option>
          <option value="Ernamkulam">Ernamkulam</option>
          <option value="Thrisuur">Thrissur</option>
          <option value="Palakkad">Palakkad</option>
          <option value="Malappuram">Malappuram</option>
          <option value="Kozhikode">Kozhikode</option>
          <option value="Wayanad">Wayanad</option>
          <option value="Kannur">Kannur</option>
          <option value="Kasargod">Kasargod</option>
          </select>
          </div>
          <div className="password">
            <label htmlFor=""><p> password</p></label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="logos">
            <div className="certificate">
              <label htmlFor=""> Add Reg Certificate of your service Center</label>
              <input type="file" className="chooseImage" onChange={handleImage} />
              <p className='text-success text-center' style={{fontWeight:'400',fontSize:'12px'}}>(This is for your permission purpose)</p>
            </div>
            <div className="certificate">
              <label htmlFor=""> Add Logo of your service Center</label>
              <input type="file" className="chooseImage" onChange={handleLogo} />
              <p className='text-success text-center' style={{fontWeight:'400',fontSize:'12px'}}>(This is for your permission purpose)</p>
            </div>
          </div>
          <button type='submit' disabled={!validForm()} className='loginSubmit'>Submit</button>
   <p>Do you have an account </p>
      <Link to='/servicecenter/login'>Login here</Link>
        </form>
      </div>
    </section>
  )
}

export default ServiceCenterSignUp