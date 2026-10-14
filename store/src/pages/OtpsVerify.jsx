import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { errorMessage, successMessage } from '../utilities/toastify'

function OtpsVerify() {
    const [otp,setotp]=useState('')
    const{state}=useLocation()
    
    const nevigate=useNavigate()
    
    const submitHandler=async (e) => {
        e.preventDefault()
        try {
            const url= "http://localhost:8080/stores/otpverify"
            const res= await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({storeId:state.storeId,otp})
            })
            const result= await res.json()
            const{code,message}=result
            if (code==200) {
                successMessage(message)
                localStorage.setItem('token',result.token)
                nevigate('/home')
            }
            if (code==400||code==403||code==500) {
                errorMessage(message)
                nevigate('/login')
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }
  return (
         <div>otpVerify
        <form action="" method="post"onSubmit={submitHandler}>
            <label htmlFor="otp">enter your otp</label>
            <input type="text" name="otp" required autoFocus onChange={(e)=>setotp(e.target.value)} />
            <button type="submit">submit</button>
        </form>
    </div>
  )
}

export default OtpsVerify
