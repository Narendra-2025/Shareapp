import React, { useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Login from './Component/Login.jsx';
import Home from './Container/Home';
import { fetchUser } from './utils/fetchUser.js';
const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUser();
    if(!user) navigate('/login');
    
  }, [])
  
  return (
    <Routes>
      <Route path='login' element= {<Login />}/>
      <Route path='/*' element= {<Home />}/>
    </Routes>
  )
}

export default App