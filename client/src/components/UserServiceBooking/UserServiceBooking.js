import React from 'react'
import './UserServiceBooking.css'

function UserServiceBooking() {
  return (
    <div className='service-booking'>
    <form action="" className='booking-form'>
    <h4>Booking Form</h4>
    <div className="vehicle">
    <label htmlFor=""> vehicle model no</label>
    <input type="text" />
    <label htmlFor=""> vehicle brand </label>
    <input type="text" />
    <label htmlFor=""> vehicle model year</label>
    <input type="text" />
    </div>

    <div className="owner">
    <label htmlFor=""> vehicle No</label>
    <input type="text" />
    <label htmlFor="">Owner Name</label>
    <input type="text" />
    <label htmlFor="">Owner Mobile No</label>
    <input type="text" />
    </div>

    <div className="booking-detials">
    <label htmlFor="">Service Station </label>
    <input type="text" disabled />
    <label htmlFor="">Package detials </label>
    <input type="text"  />
    <label htmlFor="">District</label>
    <input type="text" />
    </div>
    
    <div className="time-date">
    <label htmlFor="">Time </label>
    <input type="text"  />
    <label htmlFor="">Date</label>
    <input type="text"  />
    </div>
    <button type='submit'>Submit </button>
    </form>
    
    
    
    </div>
  )
}

export default UserServiceBooking