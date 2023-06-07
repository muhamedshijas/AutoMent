import React, { useState } from 'react'
import './UserServiceCenterChoose.css'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { ImSearch } from "react-icons/im";
import { Link } from 'react-router-dom'
import axios from 'axios'

function UserServiceCenterSelection() {
  const [serviceCenterList,setServiceCenterList]=useState([""])
  const [serviceCenters,setServiceCenters]=useState()
  const [name,setName]=useState("")
  const[refresh,setRefresh]=useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(4);


  const symbolDlt='-' ?? ' ';
  React.useEffect(()=>{
    (
        async function(){
            try{
                const {data}=await axios.get("/user/servicecenter?name="+name)
                
                if(!data.err){     
                  console.log(data)
                    setServiceCenterList(data.serviceCenter)
                    setServiceCenters(data.totalServiceCenter)
                }
            }
            
            catch(err){   
                console.log(err)
        }
        }
    )()
  },[refresh,name])


  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = serviceCenterList.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const startingNumber=(currentPage-1)*appointmentsPerPage;
  const calculateSiNo=(index)=>startingNumber+index;

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      currentAppointments.map((item,index)=>{
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
    {
      serviceCenters &&<div className='pagination'>
      {Array.from(Array(Math.ceil(serviceCenters/appointmentsPerPage)).keys()).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePaginationClick(pageNumber + 1)}
          disabled={currentPage === pageNumber + 1}
        >
          {pageNumber + 1}
        </button>
      ))}
    </div>
    }
    
    
    </div>
    </div>
    
    </div>
  )
}

export default UserServiceCenterSelection