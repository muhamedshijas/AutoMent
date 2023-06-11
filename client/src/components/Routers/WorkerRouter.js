import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import PageNotFound from '../../pages/PageNotFound';
import ViewWorkerBookingDetialsPage from '../../pages/Worker/ViewWorkerBookingDetialsPage';
import WokerEditProfilePage from '../../pages/Worker/WokerEditProfilePage';
import WorkerHomePage from '../../pages/Worker/WorkerHomePage';
import WorkerLoginpage from '../../pages/Worker/WorkerLoginpage';
import WorkerProfilePage from '../../pages/Worker/WorkerProfilePage';

function WorkerRouter() {
    const { refresh, worker } = useSelector((state) => {
        return state;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        (async function () {
            let { data: workerData } = await axios.get("/worker/auth/check")
            dispatch({ type: "worker", payload: { login: workerData.loggedIn, detials: workerData.worker } })
        })()
    }, [refresh])
    return (
        <div>
        <Routes>
        {
        worker.login &&
        <>
        <Route path='/' element={<WorkerHomePage/>}/>
        <Route path='/login' element={ <Navigate to ='/worker/'/>}/>
        <Route path='/profile' element={<WorkerProfilePage/>}/>
        <Route path='/profile/worker/edit-profile/:id' element={<WokerEditProfilePage/>}/>
        <Route path='/viewbooking/:id'element={<ViewWorkerBookingDetialsPage/>} />
        <Route path='/ *' element={<PageNotFound/>}/>
        </>

      }

      {
        worker.login===false &&
        <>
        <Route path='/' element={<Navigate to='/worker/login'/>}/>
        <Route path='/login' element={<WorkerLoginpage/>}/>
        <Route path='/profile'element={<Navigate to='/worker/login'/>}/>
        <Route path='/profile/worker/edit-profile/:id' element={<Navigate to='/worker/login'/>}/>
        <Route path='/viewbooking/:id' element={<Navigate to='/worker/login'/> }/>
        </>
      }
        </Routes>
        </div>
    )
}

export default WorkerRouter