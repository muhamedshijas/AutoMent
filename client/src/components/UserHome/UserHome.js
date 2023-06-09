import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserBanner from '../UserBanner/UserBanner';
import './userHome.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import oil from '../../assets/images/oil.png'
import washing from '../../assets/images/washing.png'
import painting from '../../assets/images/painting.png'
import wheelAlignment from '../../assets/images/wheelAlignment.png'
import AutoDiagnosis from '../../assets/images/AutoDiagnosis.png'
import repair from '../../assets/images/repair.png'
import BMW from '../../assets/images/BMW.png'
import Benz from '../../assets/images/Benz.png'
import Audi from '../../assets/images/Audi.png'
import Jaguar from '../../assets/images/jaguar.png'
import Mini from '../../assets/images/Mini.png'
import RR from '../../assets/images/RR.png'
import UserNotification from '../../modals/UserNotification';
 
function UserHome({setNotification,showModal,notification,setShowModal}) {
  const dispatch=useDispatch();


  const user=useSelector((state)=>{
    return state.user.detials

  });
  console.log("ns="+notification)

  const id=user._id

  return (
    <div className='app'>
    <div className="userBanner">
    
    <UserBanner/>
    </div>
{
  showModal &&<UserNotification notification={notification} setShowModal={setShowModal}/>
}
    <section className='userSection'>
    <h1>Our services</h1>
 
    <Row className='service'>
    <Col className="service-cards">
    <img src={wheelAlignment} alt="" />
    <b>Wheel Alignment</b>
    </Col>
    <Col className="service-cards">
    <img src={repair} alt="" srcset="" />
    <b>Full Repair</b>
    </Col>
    <Col className="service-cards">
    <img src={washing} alt="" />
    <b>washing</b>
    </Col>
    </Row>

    <Row  className='service'>
    <Col className="service-cards">
    <img src={painting} alt="" />
    <b>Painting</b>
    </Col>
    <Col className="service-cards">
    <img src={oil} alt="" />
    <b>Oil Change</b>
    </Col>
    <Col className="service-cards">
      <img src={AutoDiagnosis} alt="" />
      <b>Auto Diagnosis</b>
    </Col>
    </Row>
    
    <Row className="brands">
    <h1>Top Brands With Us</h1>
    <Col className='brand-card'>
    <img src={RR}/>
    </Col>
    <Col className='brand-card'>
    <img src={BMW}/>
    </Col>
    <Col className='brand-card'>
    <img src={Benz}/>
    </Col>
    <Col className='brand-card'>
    <img src={Audi}/>
    </Col>
    <Col className='brand-card'>
    <img src={Mini}/>
    </Col>
    <Col className='brand-card'>
    <img src={Jaguar}/>
    </Col>
    </Row>
    </section>
    </div>
  )
}

export default UserHome