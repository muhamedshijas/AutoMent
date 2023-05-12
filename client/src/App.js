import React, { useEffect } from 'react';
import UserRegisterPage from './pages/user/UserRegisterPage.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import AdminHomePage from './pages/admin/AdminHomePage.js';
import ServiceCenterLoginPage from './pages/ServiceCenter/ServiceCenterLoginPage.js';
import ServiceCenterSignUpPage from './pages/ServiceCenter/ServiceCenterSignUpPage.js';
import VerifyOtpPage from './pages/ServiceCenter/VerifyOtpPage.js';
import UserHomePage from './pages/user/UserHomePage.js';
import UserLoginPage from './pages/user/UserLoginPage.js';
import AdminUserPage from './pages/admin/AdminUserPage.js';
import ServiceCenterHomePage from './pages/ServiceCenter/ServiceCenterHomePage.js';
import AdminServiceCenterPage from './pages/admin/AdminServiceCenterPage.js';
import ServiceCenterRequestPage from './pages/admin/ServiceCenterRequestPage.js';
import ViewServiceCenterPage from './pages/admin/ViewServiceCenterPage.js';
import ServiceCenterWorkerPage from './pages/ServiceCenter/ServiceCenterWorkerPage.js';
import ServiceCenterAddWorkerPage from './pages/ServiceCenter/ServiceCenterAddWorkerPage.js';
import WorkerLoginpage from './pages/Worker/WorkerLoginpage.js';
import WorkerHomePage from './pages/Worker/WorkerHomePage.js';
import UserProfilePage from './pages/user/UserProfilePage.js';
import EditProfilePage from './pages/user/EditProfilePage.js';
import WorkerProfilePage from './pages/Worker/WorkerProfilePage.js';
function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:5000/"
  const { user, admin, refresh,serviceCenter,worker} = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("user/auth/check")
      dispatch({ type: "user", payload: { login: data.loggedIn, detials: data.user } })
      let { data: adminData } = await axios.get("/admin/auth/check")
      dispatch({ type: "admin", payload: { login: adminData.loggedIn, detials: adminData.admin } })
      let { data: serviceCenterData } = await axios.get("/serviceCenter/auth/check");
      dispatch({ type: "serviceCenter", payload: { login: serviceCenterData.loggedIn, details: serviceCenterData.serviceCenter} })
      let { data: workerData } = await axios.get("/worker/auth/check")
      dispatch({ type: "worker", payload: { login: workerData.loggedIn, detials: workerData.worker } })
    
    })()
  }, [refresh])
  return(

    <div className="App">
      <Routes>
        {
          admin.login &&
          <>
            <Route path='/admin/' element={<AdminHomePage />} />
            <Route path='/admin/login' element={<Navigate to="/admin/" />} />
            <Route path='/admin/users' element={<AdminUserPage/>}/>
            <Route path='/admin/serviceCenter' element={<AdminServiceCenterPage/>}/>
            <Route path='/admin/requests' element={<ServiceCenterRequestPage/>}/>
            <Route path='/admin/servicecenterdetials/:id' element={<ViewServiceCenterPage/>}/>
          </>
 
        }


        {
          admin.login == false &&
          <>
            <Route path='/admin/login' element={<AdminLoginPage />} />
            <Route path='/admin' element={<Navigate to="/admin/login" />} />
            <Route path='/admin/servicecenterdetials/:id' element={<Navigate to="/admin/login" />}/>
          </>
        }


        {
          user.login &&
          <>
            <Route path='/' element={<UserHomePage />} />
            <Route path='/login' element={<Navigate to="/" />} />
            <Route path='/signUp' element={<Navigate to='/' />}/>
            <Route path='/profile' element={<UserProfilePage/>}/>
            <Route path='/edit-profile/:id' element={<EditProfilePage/>}/>
          </>
        }
        {

          user.login == false &&
          <>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<UserLoginPage/>} />
          <Route path='/signUp' element={<UserRegisterPage/>}/>
          <Route path='/profile' element={<Navigate to='/login'/>}/>
          </>
        }
       
      {
        serviceCenter.login &&
        <>
        <Route path='/servicecenter' element={<ServiceCenterHomePage/>}/>
        <Route path='/servicecenter/login' element={<Navigate to='/servicecenter'/>}/>
        <Route path='/servicecenter/signup' element={<Navigate to='/servicecenter'/>}/>
        <Route path='/servicecenter/workers' element={<ServiceCenterWorkerPage/>}/> 
        <Route path='/servicecenter/addworkers' element={<ServiceCenterAddWorkerPage/>}/>
        </>
      }

      {
        serviceCenter.login===false &&
        <>
        <Route path='/servicecenter/login' element={<ServiceCenterLoginPage/>}/>
        <Route path='/servicecenter/signup' element={<ServiceCenterSignUpPage/>}/>
        <Route path='/servicecenter' element={<Navigate to='/servicecenter/login'/>}/>
        <Route path='/servicecenter/workers' element={<Navigate to='/servicecenter/login'/>}/> 
        <Route path='/servicecenter/addworkers' element={<Navigate to='/servicecenter/login'/>}/>
        </>
      }
        

      {
        worker.login &&
        <>
        <Route path='/worker' element={<WorkerHomePage/>}/>
        <Route path='/worker/login' element={ <Navigate to ='/worker/'/>}/>
        <Route path='/worker/profile' element={<WorkerProfilePage/>}/>
        </>

      }

      {
        worker.login===false &&
        <>
        <Route path='/worker' element={<Navigate to='/worker/login'/>}/>
        <Route path='/worker/login' element={<WorkerLoginpage/>}/>
        </>
      }
      </Routes>
    </div>

  );
}

export default App;
