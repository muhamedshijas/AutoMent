import React from 'react'
import Adminusers from '../../components/AdminUsers/Adminusers'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
function AdminUserPage() {
  return (
    <div className="app">
    <AdminHeader/>
    <Adminusers/>
    </div>
  )
}

export default AdminUserPage