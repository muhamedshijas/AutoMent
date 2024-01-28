import React, { useEffect } from 'react';
import UserRegisterPage from './pages/user/UserRegisterPage.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import AdminRouter from './components/Routers/AdminRouter.js';
import UserRouter from './components/Routers/UserRouter.js'
import ServiceCenterRouter from './components/Routers/ServiceCenterRouter.js';
import WorkerRouter from './components/Routers/WorkerRouter.js';

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://automent-server.onrender.com/"
  const { user, admin, refresh, serviceCenter, worker } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  return (

    <div className="App">
      <Routes>
        <Route path='/admin/*' element={<AdminRouter />} />
        <Route path='/*' element={<UserRouter />} />
        <Route path='/servicecenter/*' element={<ServiceCenterRouter />} />
        <Route path='/worker/*' element={<WorkerRouter />} />
      </Routes>
    </div>

  );
}

export default App;
