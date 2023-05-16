import React from 'react'
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
import { Link } from 'react-router-dom'

function UserServiceCenterSelection() {
  return (
    <div>
    
    <div className="choose-banner">
    <div className="servicecenter-choosing-banner">
    <h3>Where you want your Service center</h3>
    <div className="choose-input">
    <input type="text" name="" id="" placeholder="Choose your district" />
     
    search
    </div>
    </div>

    <Row className="service-centers">
    <Col className="service-center-cards">
    <Link to ='/choosepackage'>
    <div className="service-center-images">
    <img src={logo1} alt="" srcset="" />
    </div>
    <div className="service-center-detials">
    <b>name</b>
    <p>place</p>
    <p>District</p>
    </div>
    </Link>
    </Col>
    <Col className="service-center-cards">
    <div className="service-center-images">
    <img src={logo2} alt="" srcset="" />
    </div>
    <div className="service-center-detials">
    <b>name</b>
    <p>place</p>
    <p>District</p>
    </div>
    </Col>
    <Col className="service-center-cards">
    <div className="service-center-images">
    <img src={logo3} alt="" srcset="" />
    </div>
    <div className="service-center-detials">
    <b>name</b>
    <p>place</p>
    <p>District</p>
    </div>
    </Col>
    <Col className="service-center-cards">
    <div className="service-center-images">
    <img src={logo4} alt="" srcset="" />
    </div>
    <div className="service-center-detials">
    <b>name</b>
    <p>place</p>
    <p>District</p>
    </div>
    </Col>
    </Row>
    <Row className="service-centers">
    
    <Col className="service-center-cards">
    <div className="service-center-images">
    <img src={logo8} alt="" srcset="" />
    </div>
    <div className="service-center-detials">
    <b>name</b>
    <p>place</p>
    <p>District</p>
    </div>
    </Col>
    <Col className="service-center-cards">
    <div className="service-center-images">
    <img src={logo5} alt="" srcset="" />
    </div>
    <div className="service-center-detials">
    <b>name</b>
    <p>place</p>
    <p>District</p>
    </div>
    </Col>
    <Col className="service-center-cards">
    <div className="service-center-images">
    <img src={logo6} alt="" srcset="" />
    </div>
    <div className="service-center-detials">
    <b>name</b>
    <p>place</p>
    <p>District</p>
    </div>
    </Col>
    <Col className="service-center-cards">
    <div className="service-center-images">
    <img src={logo7} alt="" srcset="" />
    </div>
    <div className="service-center-detials">
    <b>name</b>
    <p>place</p>
    <p>District</p>
    </div>
    </Col>
    </Row>
    </div>
    
    </div>
  )
}

export default UserServiceCenterSelection