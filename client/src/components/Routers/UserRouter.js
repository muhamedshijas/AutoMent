import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from '../../pages/PageNotFound';
import CreateCustomPackagePage from '../../pages/user/CreateCustomPackagePage';
import EditProfilePage from '../../pages/user/EditProfilePage';
import ForgetPage from '../../pages/user/ForgetPage';
import PackageSelectionPage from '../../pages/user/PackageSelectionPage';
import ServiceBookingPage from '../../pages/user/ServiceBookingPage';
import ServiceCenterSlectionPage from '../../pages/user/ServiceCenterSlectionPage';
import ServiceHistoryPage from '../../pages/user/ServiceHistoryPage';
import UserHomePage from '../../pages/user/UserHomePage';
import UserLoginPage from '../../pages/user/UserLoginPage';
import UserProfilePage from '../../pages/user/UserProfilePage';
import UserRegisterPage from '../../pages/user/UserRegisterPage';
import Mapbox from '../MapBox/Mapbox';

function UserRouter() {
    const { user,  refresh} = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("user/auth/check")
      dispatch({ type: "user", payload: { login: data.loggedIn, detials: data.user } })
    })()
  }, [refresh])
  return (
    <div>
    <Routes>
    {
          user.login &&
          <>
            <Route path='/' element={<UserHomePage />} />
            <Route path='/login' element={<Navigate to="/" />} />
            <Route path='/signUp' element={<Navigate to='/' />}/>
            <Route path='/profile' element={<UserProfilePage/>}/>
            <Route path='/edit-profile/:id' element={<EditProfilePage/>}/>
           <Route path='/chooseservicecenter' element={<ServiceCenterSlectionPage/>}/>
           <Route path='/choosepackage/:id' element={<PackageSelectionPage/>}/>
           <Route path='/createcustompackage/:id' element={<CreateCustomPackagePage/>}/>
           <Route path='/bookservice' element={<ServiceBookingPage/>}/>
           <Route path='/servicehistory/:id' element={<ServiceHistoryPage/>}/>
           <Route path='/mapbox' element ={<Mapbox/>}/>
           <Route path='/*' element={<PageNotFound/>}/>
           <Route path='/forgetpassword' element={<ForgetPage/>}/>
     
          </>
        }
        {

          user.login == false &&
          <>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<UserLoginPage/>} />
          <Route path='/signUp' element={<UserRegisterPage/>}/>
          <Route path='/profile' element={<Navigate to='/login'/>}/>
          <Route path='/edit-profile/:id' element={<Navigate to='/login'/>}/>
          <Route path='/chooseservicecenter'element={<Navigate to='/login'/>}/>
          <Route path='/createcustompackage'element={<Navigate to='/login'/>}/>
          <Route path='/createcustompackage/:id' element={<Navigate to='/login'/>}/>
          <Route path='/forgetpassword' element={<ForgetPage/>}/>
     
          </>
        }
    
    </Routes>
    
    </div>
  )
}

export default UserRouter