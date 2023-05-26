import React from 'react'
import { useParams } from 'react-router-dom'
import UserHeader from '../../components/UserHeader/UserHeader'
import UserServicehistory from '../../components/UserServiceHistory/UserServicehistory'

function ServiceHistoryPage(props) {
  const {id}=useParams()
  return (
    <div>
    
    <UserHeader/>
    <UserServicehistory id={id}/>
    </div>
  )
}

export default ServiceHistoryPage