import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
//import { otpsender } from '../../../backend/controller/emailController';

function Varification(props) {
  const[values,setValues]=useState('')
  const navigate=useNavigate()
  const {state}=useLocation()
  if (!state) {
    return navigate('/register')
  }
console.log("email",state.email,values);
const sendValues="mj"


  const submitHandler=async(e)=>{
    e.preventDefault()
    console.log(state.email,values);
    
    try {
    const url= "http://localhost:8080/auth/varification"
    const req=await fetch(url,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({email:state.email,otp:values})
      
      
    })

    const result=await req.json()
    console.log("hjg",result);
  } catch (error) {
      console.log(error);
      
    }
  }
  const otpSender=async (e) => {
    e.preventDefault()
    try {
      const url= "http://localhost:8080/auth/otpsent"
    const req=await fetch(url,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({email:state.email})
      
      
    })

    const response= await req.json()
    console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }    
  return (
    <div>Varification
      <form action="" method="post"onSubmit={submitHandler}>
        <label htmlFor="otp">enter your otp</label>
        <input type="text" name="otp" required onChange={(e)=>setValues(e.target.value)}/>
        <button type="button"onClick={otpSender}>send otp</button>
        <div className="submit">
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Varification