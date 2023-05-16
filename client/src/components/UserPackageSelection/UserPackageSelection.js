import React from 'react'
import './UserPackageSelection.css'
import { FcOk } from "react-icons/fc";
import basic from '../../assets/images/basic.png'
import comprehensive from '../../assets/images/comprehensive.png'
import standard from '../../assets/images/standard.png'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';

function UserPackageSelection() {
  return (
    <div>
    <div className="container choose-package">
    <h3 >
    Scheduled packages
    </h3>
    <div className="package-cards">
    <div className="package-image">
    <img src={basic} alt="" srcset="" />
    </div>
    <div className="package-detials">
    <h4>Basic Package</h4>
    <Row>
    <Col className='package-col'>
    <div className="package-name"><FcOk/>Wiper fluid Replacement</div>
    <div className="package-name"><FcOk/> Car Wash</div>
    <div className="package-name"><FcOk/>Interior Vacouming</div>
    <div className="package-name"><FcOk/>Battery Water Topup</div>
    </Col>
    <Col className='package-col'>
    <div className="package-name"><FcOk/>Engine Oil Replacement</div>
    <div className="package-name"><FcOk/> Air filter cleaning</div>
    <div className="package-name"><FcOk/>Coolent topup</div>
    </Col>
    </Row>
    </div>
    <div className="package-buton">
    <button> choose</button>
    </div>
    </div>
  


    <div className="package-cards">
    <div className="package-image">
    <img src={standard} alt="" srcset="" />
    </div>
    <div className="package-detials">
    <h4>Standard Package</h4>
    <Row>
    <Col className='package-col'>
    <div className="package-name"><FcOk/>Full basic service package</div>
    <div className="package-name"><FcOk/>Fuel filter Checking</div>
    <div className="package-name"><FcOk/>Break pad  service</div>
    </Col>
    <Col className='package-col'>
    <div className="package-name"><FcOk/>Heater Or spark plugs checking</div>
    <div className="package-name"><FcOk/>Car Scanning</div>
    <div className="package-name"><FcOk/>Ac filter cleaning</div>
    </Col>
    </Row>
    </div>
    <div className="package-buton">
    <button> choose</button>
    </div>
    </div>


    <div className="package-cards">
    <div className="package-image">
    <img src={comprehensive} alt="" srcset="" />
    </div>
    <div className="package-detials">
    <h4>Comprehensive Package</h4>
    <Row>
    <Col className='package-col'>
    <div className="package-name"><FcOk/>Basic & standard service package</div>
    <div className="package-name"><FcOk/> wheel Alignment</div>
    <div className="package-name"><FcOk/>gear oil topup</div>
    <div className="package-name"><FcOk/>Brake fluid</div>
    </Col>
    <Col className='package-col'>
    <div className="package-name"><FcOk/>Heater Or spark plugs checking</div>
    <div className="package-name"><FcOk/> Engine flushing</div>
    <div className="package-name"><FcOk/>Throttle body  clean up</div>
    </Col>
    </Row>
    </div>
    <div className="package-buton">
    <button> choose</button>
    </div>
    </div>
    <div className="create-custom-button">
    <Link to='/createcustompackage'>
    <button className='custom-button'>Create custom package</button>
    </Link>
    </div>
    </div>
    </div>
  )
}

export default UserPackageSelection