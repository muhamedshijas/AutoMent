import React from 'react'
import UserHeader from '../../components/UserHeader/UserHeader'
import { useParams } from 'react-router-dom'
import UserPackageSelection from '../../components/UserPackageSelection/UserPackageSelection'

function PackageSelectionPage() {
  const {id}=useParams()
  return (
    <div>
    <UserHeader/>
    <UserPackageSelection  id={id}/>
    
    </div>
  )
}

export default PackageSelectionPage