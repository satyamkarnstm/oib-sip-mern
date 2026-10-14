import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { errorMessage, successMessage } from '../utilities/toastify'

function Varification() {
  const {id}= useParams()
  const navigate=useNavigate()
  
  const StoreVerification=async (e) => {
   // e.preventDefault()
    try {
      const url="http://localhost:8080/stores/verify"
      const req= await fetch(url,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({id})
      })
      const result= await req.json()
      const{code,message}=result;
      if (code==200) {
        successMessage(message)
        navigate('/login')
      }
      if (code==400||code==401||code==500) {
        errorMessage(message)
      }
      } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    StoreVerification()
  }, [])
  
  return (
    <div>Varification</div>
  )
}

export default Varification