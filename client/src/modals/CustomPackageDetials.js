import React from 'react'
import './CustomPackageDetials.css'
import { RiCloseLine } from "react-icons/ri";
function CustomPackageDetials({setShowModal,packageDetials}) {
    async function handleClose(){
        setShowModal(false)
      }
  return (
    <div className="cp-main">
    <div className="custom-package-detials">
    <div className="close">
    <RiCloseLine onClick={handleClose}/>
    </div>
    <h3>Custom Services</h3>
    <table>
    {
        packageDetials.map((item,index)=>{
            return <tr>
            <td>{index+1}</td>
            <td>{item}</td>
            </tr>
        })
    }
    </table>

   
    </div>
    </div>
  )
}

export default CustomPackageDetials