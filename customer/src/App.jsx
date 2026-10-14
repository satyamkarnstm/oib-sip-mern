import { useEffect, useState } from 'react'
import './App.css'
import {Routes, Route, Link, Navigate, useNavigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Varification from './pages/Varification'
import { ToastContainer } from 'react-toastify'
import ResetPass from './pages/ResetPass'
import Order from './pages/Order'
import Select from './pages/Select'
import Thanks from './pages/Thanks'
//import ResetPassword from './pages/resetPassword'

function App() {
  //const [count, setCount] = useState('')
  const [user,setuser]=useState('')
  const navigate=useNavigate()
  const nhm= localStorage.getItem('token')

  const getVerify=async () => {
    try {
      const url='http://localhost:8080/varify'
      const res= await fetch(url,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({token:nhm})
      })
      const result= await res.json()
      console.log(result);
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

//console.log('hh',count);

const logout=()=>{
  localStorage.clear()
  navigate('/login')
}
useEffect(()=>{
  //window.location.reload()
},[])
  return (
    <>{nhm&&
    <div className='header'>
      <h2 className='heading'>{user.name}</h2>
      <button className='logout' onClick={logout}>logout</button>
    </div>}
    
    <Routes>
      <Route path='/' element={<Navigate to="/login"/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='varification' element={<Varification/>}/>
      <Route path='Home' element={<Home />}/>
      <Route path='select' element={<Select/>}/>
      <Route path='order' element={<Order user={user}/>}/>
      <Route path='thanks' element={<Thanks/>}/>
      <Route path='/:id' element={<ResetPass/>}/>
    </Routes>
     <ToastContainer/>
    </>
  )
}

export default App
