import React ,{useEffect} from 'react';
import UserRegisterPage from './pages/user/UserRegisterPage.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import AdminHomePage from './pages/admin/AdminHomePage.js';
function App() {
axios.defaults.withCredentials=true;
axios.defaults.baseURL="http://localhost:5000/"
const {user,admin,refresh}=useSelector((state)=>{
  return state;
});
const dispatch=useDispatch();
useEffect(()=>{
  (async function(){
    let {data}=await axios.get("user/auth/check")
    dispatch({type:"user",payload:{login:data.loggedIn,detials:data.user}})
    let {data:adminData}=await axios.get("/admin/auth/check")
    dispatch({type:"admin",payload:{login:adminData.loggedIn,detials:adminData.admin}})
    
  })()
},[refresh])
  return (

    <div className="App">
    <Routes>   
    {
      admin.login&&
      <>
      <Route path='/admin/' element={<AdminHomePage/>}/>
      <Route path='/admin/login' element={<Navigate to="/admin/" />}/>
      </>


    }
    {
      admin.login==false&&
      
      <>
      <Route path='/admin/login' element={<AdminLoginPage/>}/>
      <Route path='/admin' element={<Navigate to="/admin/login"/>}/>
      </>
    }
    </Routes>
    </div>
   
  );
}

export default App;
