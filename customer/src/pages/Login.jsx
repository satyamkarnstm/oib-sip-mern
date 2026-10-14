import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { errorMessage, successMessage } from '../utilities/tostify'

function Login() {
  const [values,setValues]=useState({
    email:'',
    password:""
  })
  const navigate=useNavigate()
  const changeHandler=(e)=>{
    const {name,value}=e.target
    const copyValues={...values}
    copyValues[name]= value
    setValues(copyValues)
  }
  const submitHandler=async(e)=>{
    e.preventDefault()
    try {
      const url='http://localhost:8080/auth/login'
      const req= await fetch(url,{
        method:"POST",
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify(values)
      })
      const response=await req.json()
      console.log(response);
      const {code,message,token}=response
      switch (code) {
        case 202:
          successMessage(message)
          localStorage.setItem('token',token)
          navigate("/home")
          break;
        case 406:
          errorMessage(message)
          break;
        case 405:
          errorMessage(message)
          navigate("/varification",{state:{email:values.email}})
          break;
        case 500:
          console.log(message);
          break;
        default:
          navigate("/login")
          break;
      }

      
    } catch (error) {
      console.log(error.message);
      
      
    }
  }
  const resetPassHandler=async(e)=>{
    e.preventDefault()
    if (!values.email) {
      return errorMessage("please enter your email")
    }
    try {
      const url='http://localhost:8080/auth/resetpass'
      const req= await fetch(url,{
        method:"POST",
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify({email:values.email})
      })
      const response=await req.json()
      console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className='formcontainer'>
      <h3>Login</h3>
        <form action="" method="post" onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required onChange={changeHandler} autoFocus/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required onChange={changeHandler}/>
            <p className='fgp' onClick={resetPassHandler}>forget password</p>
            <div className="submit">
            <button type="submit">Login</button>
            </div>
            <p>Haven't any account?
              <Link to="/register">Register</Link>
            </p>
            
        </form>
    </div>
  )
}

export default Login