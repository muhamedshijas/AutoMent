import React from 'react'
import './UserNotification.css'
import noNotf from '../assets/images/noNotf.png'
import not from '../assets/images/not.png'
import { RiCloseLine } from "react-icons/ri";

function UserNotification({notification,setShowModal}) {
  async function handleClose(){
    setShowModal(false)
  }
console.log("nt="+notification)
  return (
    <div className="nt-main">
    <div className="notifications">
    <div className="close">
    <RiCloseLine onClick={handleClose}/>
    </div>
    <nt-head> <h3>Todays Appointments
</h3></nt-head>
  {
    notification[0]? <div className="nt-sections">
    {
      notification.map((item)=>{
        return <div className="nt-cards">
        <div className="nt-card-image">
        <img src={not} alt="" srcset="" />
        </div>
        <div className="nt-card-detials">
        <div className="nt-card-header">
        <b>{item.serviceCenterName}</b>
        <p> {new Date(item.dateOfService).toLocaleDateString() }</p>
        </div>
        <div className="nt-card-content">
        <p>" Hi  {item.ownerName}..! You vehicle <b> {item.vehicleNo} </b> have service on  today at {item.serviceCenterName} service Center please contact with us for more updates"</p>
        </div>
        </div> 
        </div>
      })
    }
    
    </div>:<div className="not-found-notf">
    <div className="not-found-image">
    <img src={noNotf} alt="" srcset="" />
    </div>
    <p className='text-danger'>No Data Available</p>
    </div>
  }
    
    </div>
    </div>
  )
}

export default UserNotification