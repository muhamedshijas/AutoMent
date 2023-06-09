import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { RiNotification3Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import './UserHomeHeader.css'
function UserHomeHeader({setNotification,setShowModal,notification}) {
    const user=useSelector((state)=>{
      return state.user.detials

    });
    const id=user._id

    useEffect(() => {
        console.log("hihelloo")
    const fetchAppointments = async () => {
      try {
        const {data} = await axios.get('/user/appointments/'+id);
        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = data.filter(appointment => new Date(appointment.dateOfService).toISOString().split('T')[0]==today);
        setNotification(todayAppointments)
        todayAppointments.forEach(appointment => {
          if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                new Notification('Booking  Reminder', {
                  body: `You have an vehicle  have service on  today ${appointment.serviceCenterName} service center`,
                });
              }
            });
          }
        });
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);  

      
      const dispatch=useDispatch();
      async function handleLogout(e) {
        e.preventDefault()
        Swal.fire({
          title: 'Are you sure? logout',
          text: "logout from this account!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#7e3af2',
          cancelButtonColor: '##a8a8a8',
          confirmButtonText: 'Yes, Logout!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.get("/user/auth/logout")
            dispatch({type:"refresh"})
          }
        })
      }
      console.log(notification)
      async function handleModal(){
        setShowModal(true)
      }
        
  return (
    <div className="nav">
    <div className="logo">
    <Link to ='/'>
    <h3>AutoMent</h3>
    </Link>
    </div>
    <div className="detials">
    <Link to ='/profile'>
    <h5>{user.name}</h5>
    </Link>

    {
      notification  &&<RiNotification3Line onClick={handleModal}/>
    }
    <button onClick={handleLogout}>Logout</button>
    </div>
    </div>

  )
}

export default UserHomeHeader