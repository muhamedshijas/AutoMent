import React, { useState } from 'react'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import './CreateCustompackage.css'
import custom  from '../../assets/images/custom.png'
import AddCustomService from '../../modals/AddCustomService';
import { FcOk } from "react-icons/fc";

function CreateCustompackage() {

  const [showModal, setShowModal] = useState(false)
  const [refresh, setRefresh] = useState(false)


  const addCustomService = async () => {
        console.log("hiiii")
        setShowModal(true)
    }

  return (
    <div className='container'>
    
    <div className="package-cards">
    <div className="package-image">
    <img src={custom} alt="" srcset="" />
    </div>
    <div className="package-detials">
    
    <h4>Custom Package</h4>
    <Row>
    <Col className='package-col'>
    <div className="package-name"><FcOk/>Full basic service package</div>
    </Col>
    <Col className='package-col'>
    </Col>
    </Row>
    </div>
    <div className="package-buton">
    <button> choose</button>

  
    </div>

    </div>

    <div className="add-service">
    <div className="add-service-button">

    <button onClick={addCustomService}>Add a service</button>
    </div>
    </div>
    <div className="modals">
    
    {
                showModal &&
                <AddCustomService  setShowModal={setShowModal} refresh={refresh}  setRefresh={setRefresh} />
              }
              </div>
              </div>
    
    
  )
}

export default CreateCustompackage