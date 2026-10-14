import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {Routes,Route, Navigate, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Varification from './pages/Varification'
import OtpsVerify from './pages/OtpsVerify'
import Order from './pages/Order'
import { useEffect } from 'react'
import Stocks from './pages/Stocks'



function App() {
  const [user,setuser]=useState('')
  const navigate=useNavigate()
  const token= localStorage.getItem('token')
  
  // for verify token
  const getVerify=async () => {
    try {
      const url='http://localhost:8080/varify'
      const res= await fetch(url,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({token})
      })
      const result= await res.json()
      if (result.code==200) {
        setuser(result)
        navigate('/home')
      }
      if (result.code==401) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    getVerify()
  },[])
    
  //for logout
  const logout=()=>{
    localStorage.clear()
    navigate('/login')
  }
    

  return (
    <>{token&&
    <div className='header'>
      <h2 className='heading'>{user.name}</h2>
      <p onClick={()=>navigate("/home")} className='pointer'>home</p>
      <p onClick={()=>navigate("/stocks")} className='pointer'>stocks</p>
      <button className='logout' onClick={logout}>logout</button>
    </div>}
    
    <Routes>
      <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home storeId={user.id}/>}/>
      <Route path='/stocks' element={<Stocks storeId={user.id}/>}/>
      <Route path='/varify/:id' element={<Varification/>}/>
      <Route path='/otpVerify' element={<OtpsVerify/>}/>
      
    </Routes>
    <ToastContainer/>

    </>
  )
}

export default App
