import React, { useState } from 'react'
import UserHeader from '../../components/UserHeader/UserHeader'
import UserHome from '../../components/UserHome/UserHome'
import UserHomeHeader from '../../components/UserHomeHeader/UserHomeHeader';

function UserHomePage() {

const [notification,setNotification]=useState([]);
const [showModal,setShowModal]=useState(false)
console.log("Header",showModal)
  return (
    <div>
    <UserHomeHeader setShowModal={setShowModal} setNotification={setNotification} notification={notification}/>
    <UserHome setShowModal={setShowModal} showModal={showModal}  notification={notification}/>
    
    </div>
  )
}

export default UserHomePage