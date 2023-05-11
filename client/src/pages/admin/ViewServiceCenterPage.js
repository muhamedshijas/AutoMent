import React, { useEffect, useState } from 'react'
import AdminViewServiceCenter from '../../components/AdminViewServiceCenter/AdminViewServiceCenter'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function ViewServiceCenterPage(props) {
  const {id}=useParams()
  return (
    <div><AdminViewServiceCenter id={id}/></div>
  )
}

export default ViewServiceCenterPage