import React, { useState } from 'react'
import { errorMessage, successMessage } from '../utilities/toastify';
import {Link} from 'react-router-dom'
function Register() {
  const[values,setValues]=useState({name:'',place:'',email:'',password:''})

  const changeHandler=(e)=>{
    const{name,value}=e.target;
    const copyValues={...values}
    copyValues[name]=value
    setValues(copyValues)
  }

  const submitHandler=async (e) => {
    e.preventDefault()
    try {
      const url="http://localhost:8080/stores/registration"
      const req= await fetch(url,{
        method:'POST',
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(values)
      })
      setValues('')
      const response= await req.json()
      const{code,message}=response
      if (code==201) {
        successMessage(message)
      }
      if (code==400||code==500) {
        errorMessage(message)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div>Register
      <form action="" method="post" onSubmit={submitHandler}>
        <label htmlFor="name">store name</label>
        <input type="text" name="name" required onChange={changeHandler}/>
        <label htmlFor="place">city</label>
        <input type="text" name="place" required onChange={changeHandler} />
        <label htmlFor="email">email</label>
        <input type="email" name="email" required onChange={changeHandler} />
        <label htmlFor="password">password</label>
        <input type="password" name='password' required onChange={changeHandler} />
        <button type="submit">Register</button>
        <p>already have a account?<Link to='/login'>login</Link>  </p>
      </form>
    </div>
  )
}

export default Register