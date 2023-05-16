import React from 'react'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import standard from '../../assets/images/standard.png'
import './CreateCustompackage.css'
import custom  from '../../assets/images/custom.png'


import { FcOk } from "react-icons/fc";

function CreateCustompackage() {
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

    <button>Add a service</button>
    </div>
    </div>
    </div>
  )
}

export default CreateCustompackage