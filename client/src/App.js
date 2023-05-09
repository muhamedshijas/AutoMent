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
function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:5000/"
  const { user, admin, refresh } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("user/auth/check")
      dispatch({ type: "user", payload: { login: data.loggedIn, detials: data.user } })
      console.log(data)
      let { data: adminData } = await axios.get("/admin/auth/check")
      dispatch({ type: "admin", payload: { login: adminData.loggedIn, detials: adminData.admin } })
      console.log(adminData)
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
          </>

        }


        {
          admin.login == false &&
          <>
            <Route path='/admin/login' element={<AdminLoginPage />} />
            <Route path='/admin' element={<Navigate to="/admin/login" />} />
          </>
        }

        {
          <>
            <Route path='/serviceCenter/login' element={<ServiceCenterLoginPage />} />
            <Route path='/serviceCenter/signUp' element={<ServiceCenterSignUpPage />} />
            <Route path='/verifyOtp' element={<VerifyOtpPage />} />

          </>
        }

        {
          user.login &&
          <>
            <Route path='/' element={<UserHomePage />} />
            <Route path='/login' element={<Navigate to="/" />} />
            <Route path='/signUp' element={<Navigate to='/' />}/>
          </>
        }
        {

          user.login == false &&
          <>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<UserLoginPage/>} />
          <Route path='/signUp' element={<UserRegisterPage/>}/>
          </>
        }

      </Routes>
    </div>

  );
}

export default App;
