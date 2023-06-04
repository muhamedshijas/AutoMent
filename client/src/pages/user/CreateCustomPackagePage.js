import React from 'react'
import { useParams } from 'react-router-dom'
import CreateCustompackage from '../../components/CreateCustomPackage/CreateCustompackage'
import UserHeader from '../../components/UserHeader/UserHeader'

function CreateCustomPackagePage() {
  const {id}=useParams()
  return (
    <div>
    <UserHeader/>
    <CreateCustompackage id={id}/>
    </div>
  )
}

export default CreateCustomPackagePage