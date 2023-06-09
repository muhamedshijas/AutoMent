import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import './CreateCustompackage.css'
import custom from '../../assets/images/custom.png'
import AddCustomService from '../../modals/AddCustomService';
import { FcOk } from "react-icons/fc";
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateCustompackage({id}) {
  console.log(id)
  const [showModal, setShowModal] = useState(false)
  const [serviceCenter,setServiceCenter]=useState("")
  const [refresh, setRefresh] = useState(false)
  const [customServicesPackage, setCustomServicesPackage] = useState([]);
  const addServiceToPackage = (service) => {
    setCustomServicesPackage([...customServicesPackage, service]);
  };
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/user/chooseservicecenter/" + id)
      if (!data.err) {
   
        setServiceCenter(data.serviceStation)
      

      }
    })()
  }, [refresh])
  console.log(serviceCenter)
  const addCustomService = async () => {

    setShowModal(true)

  }
  console.log(customServicesPackage)
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
              {
                customServicesPackage.map((item) => {
                  return <div className="package-name"><FcOk />{item}</div>
                })
              }
            </Col>
            <Col className='package-col'>
            </Col>
          </Row>
        </div>
        <div className="package-buton">
        <Link to='/bookservice' state={{ package: "Custom Package", serviceCenter: serviceCenter,packageDetials:customServicesPackage}} >
        <button> Choose</button>
      </Link>


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
          <AddCustomService setShowModal={setShowModal} addService={addServiceToPackage} refresh={refresh} setRefresh={setRefresh} />
        }
      </div>
    </div>


  )
}

export default CreateCustompackage