import React, { useState } from 'react'
import './UserServiceCenterChoose.css'
import logo1 from '../../assets/images/logo1.png'
import logo2 from '../../assets/images/logo2.png'
import logo3 from '../../assets/images/logo3.png'
import logo4 from '../../assets/images/logo4.png'
import logo5 from '../../assets/images/logo5.png'
import logo6 from '../../assets/images/logo6.png'
import logo7 from '../../assets/images/logo7.png'
import logo8 from '../../assets/images/logo8.png'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { ImSearch } from "react-icons/im";
import { Link } from 'react-router-dom'
import axios from 'axios'

function UserServiceCenterSelection() {
  const [serviceCenterList,setServiceCenterList]=useState([""])
  const [name,setName]=useState("")
  const[refresh,setRefresh]=useState(false)

  const symbolDlt='-' ?? ' ';
  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/user/servicecenter?name="+name)
                
                if(!data.err){     
                  console.log(data)
                    setServiceCenterList(data.serviceCenter)
                }
            }
            
            catch(err){   
                console.log(err)
        }
        }
    )()
  },[refresh,name])
  return (
    <div>
    
    <div className="choose-banner">
    <div className="servicecenter-choosing-banner">
    <h3>Where you want your Service center</h3>
    <div className="choose-input">
    <input type="text" name="" id="" placeholder="Choose your district"  value={name} onChange={(e) => setName(e.target.value)} />
    <ImSearch/>
    </div>
    </div>

    <div className="service-centers">
    <Row>
    {
      serviceCenterList.map((item,index)=>{
        return <Col xs={6} md={3} >
        <div className="service-center-cards mt-5">
        <Link to={'/choosepackage/'+item._id}>
        <div className="service-center-images">
        {item.logo && <img src={item.logo.url} alt="" />}
        </div>
        <div className="service-center-detials">
        <b>{item.name}</b>
        <p>{item?.place?.replaceAll(" ", '-').replaceAll(",", '-').split("-")[0]}</p>
        <p>{item.district}</p>
        </div>
        </Link>
        </div>
        </Col>
        
      })
      
    }
    
    
    
    </Row>
    
    </div>
    </div>
    
    </div>
  )
}

export default UserServiceCenterSelection