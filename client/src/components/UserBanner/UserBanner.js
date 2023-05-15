import React from 'react'
import { Link } from 'react-router-dom'
import bannerImage from '../../assets/images/bannerImage.png' 
import './UserBanner.css'

function UserBanner() {
  return (

    <div className="banner">
   <div className="book-service">
   <b>"Your vehicle deserves the best care 
</b>
<b>book a service appointment today!"</b>
<Link to='/chooseservicecenter'>
<button>Book Your Slot</button>
</Link>
</div>
   <div className="bannerImage">
   <img src={bannerImage} alt="" srcset="" />
   </div> 
    </div>
  )
}

export default UserBanner