import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function WorkerHeader() {    
    const worker=useSelector((state)=>{
        console.log(state.worker)
    return state.worker.detials

  });
  console.log(worker)

 

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
        await axios.get("/worker/auth/logout")
      dispatch({type:"refresh"})
      }
    })
  }
return (
<div className="nav">
<div className="logo">
<h3>AutoMent</h3>
</div>
<div className="detials">
<Link to ='/worker/profile'>

<h5>{worker.name}</h5>
</Link>
<button onClick={handleLogout}>Logout</button>
</div>
</div>

)
}

export default WorkerHeader