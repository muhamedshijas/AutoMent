import React ,{useEffect} from 'react';
import UserRegisterPage from './pages/user/UserRegisterPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
function App() {
axios.defaults.withCredentials=true;
axios.defaults.baseURL="http//localhost:5000/"
const {user,admin,refresh}=useSelector((state)=>{
  return state;
});
const dispatch=useDispatch();
useEffect(()=>{
  (async function(){
    let {data}=await axios.get("user/auth/check")
    dispatch({type:user,payload:{login:data.loggedIn,detials:data.user}})
  })()
},[refresh])
  return (
    <div  className='hello'>
    <UserRegisterPage/>
    </div>
  );
}

export default App;
