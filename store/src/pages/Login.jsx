import React, { useState } from 'react'
import { errorMessage, successMessage } from '../utilities/toastify';
import { Link, useNavigate, useNavigation } from 'react-router-dom';

function Login() {
  const[values,setValues]=useState({storeId:'',password:''})
  const nevigation=useNavigate()

  const changeHandler=(e)=>{
    const{name,value}=e.target;
    const copyvalues={...values}
    copyvalues[name]=value;
    setValues(copyvalues)
 }

  const submitHandler=async (e) => {
    e.preventDefault()
    try {
      const url="http://localhost:8080/stores/login"
      const req= await fetch(url,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(values)
      })
      const result= await req.json()
      const{code,message}=result;
      if (code==200) {
        successMessage(message)
        nevigation('/otpVerify',{state:{storeId:values.storeId}})
      }
      if (code==400||code==401) {
        errorMessage(message)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div>Login
      <form action="" method="post"onSubmit={submitHandler}>
        <label htmlFor="id">store Id</label>
        <input type="text" name="storeId" required onChange={changeHandler}/>
        <label htmlFor="password">password</label>
        <input type="password" name="password" required onChange={changeHandler}/>
        <button type="submit">send otp</button>
        <p>haven't any accout?<Link to='/register'>register</Link></p>
      </form>
      
    </div>
  )
}

export default Login