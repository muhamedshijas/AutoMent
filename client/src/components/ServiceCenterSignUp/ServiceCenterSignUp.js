import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginImage } from '../images/Images'
import '../AdminLogin/adminLogin.css'
import { useNavigate } from 'react-router-dom';
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

    const ImageTOBase=(file)=>{
      const reader= new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setFinalImage(reader.result)
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
    email,name, password, place, district, certificate:finalImage
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
            <label htmlFor=""><p> district</p></label>
            <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} />
          </div>
          <div className="password">
            <label htmlFor=""><p> password</p></label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="logos">
            <div className="certificate">
              <label htmlFor=""> Add Certificate of your service Center</label>
              <input type="file" className="chooseImage" onChange={handleImage} />
            </div>
          </div>
          <button type='submit' className='loginSubmit'>Submit</button>

        </form>
      </div>
    </section>
  )
}

export default ServiceCenterSignUp