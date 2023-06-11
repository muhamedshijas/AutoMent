import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminAddServicePage from '../../pages/admin/AdminAddServicePage';
import AdminHomePage from '../../pages/admin/AdminHomePage';
import AdminLoginPage from '../../pages/admin/AdminLoginPage';
import AdminServiceCenterPage from '../../pages/admin/AdminServiceCenterPage';
import AdminServicePage from '../../pages/admin/AdminServicePage';
import AdminUserPage from '../../pages/admin/AdminUserPage';
import ServiceCenterRequestPage from '../../pages/admin/ServiceCenterRequestPage';
import ViewServiceCenterPage from '../../pages/admin/ViewServiceCenterPage';
import PageNotFound from '../../pages/PageNotFound';

function AdminRouter() {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:5000/"
    const { admin, refresh } = useSelector((state) => {
        return state;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        (async function () {
            let { data: adminData } = await axios.get("/admin/auth/check")
            dispatch({ type: "admin", payload: { login: adminData.loggedIn, detials: adminData.admin } })
            let { data: serviceCenterData } = await axios.get("/serviceCenter/auth/check");
        })()
    }, [refresh])
    return (
        <div>

        <Routes>
        {
          admin.login &&
          <>
            <Route path='/' element={<AdminHomePage />} />
            <Route path='/login' element={<Navigate to="/admin/" />} />
            <Route path='/users' element={<AdminUserPage/>}/>
            <Route path='/serviceCenter' element={<AdminServiceCenterPage/>}/>
            <Route path='/requests' element={<ServiceCenterRequestPage/>}/>
            <Route path='/servicecenterdetials/:id' element={<ViewServiceCenterPage/>}/>
            <Route path='/service' element={<AdminServicePage/>}/>
            <Route path='/addServices' element={<AdminAddServicePage/>}/>
            <Route path='/*' element={<PageNotFound/>}/>
          </>

 
        }


        {
        admin.login == false &&
          <>
            <Route path='/login' element={<AdminLoginPage />} />
            <Route path='/' element={<Navigate to="/admin/login" />} />
            <Route path='/servicecenterdetials/:id' element={<Navigate to="/admin/login" />}/>
            <Route path='/users' element={<Navigate to="/admin/login" />}/>
            <Route path='/serviceCenter' element={<Navigate to="/admin/login" />}/>
            <Route path='/requests'element={<Navigate to="/admin/login" />}/>
          </>
        }

        
        </Routes>

        </div>
    )
}

export default AdminRouter