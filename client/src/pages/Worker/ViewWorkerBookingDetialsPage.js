import React from 'react'
import { useParams } from 'react-router-dom'
import WorkerHeader from '../../components/workerHeader/WorkerHeader'
import WorkerHome from '../../components/WorkerHome/WorkerHome'
import WorkerViewBookingDetials from '../../components/WorkerViewBookingDetials/WorkerViewBookingDetials'

function ViewWorkerBookingDetialsPage(props) {
    const {id}=useParams()
  return (
    <div>
    <WorkerHeader/>
    <WorkerViewBookingDetials id={id}/>
    </div>
  )
}

export default ViewWorkerBookingDetialsPage