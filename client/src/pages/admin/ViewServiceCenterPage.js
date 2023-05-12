import React, { useEffect, useState } from 'react'
import AdminViewServiceCenter from '../../components/AdminViewServiceCenter/AdminViewServiceCenter'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader/AdminHeader'


function ViewServiceCenterPage(props) {
  const {id}=useParams()
  return (
    <div>
    <AdminHeader/>
    <AdminViewServiceCenter id={id}/></div>
  )
}

export default ViewServiceCenterPage