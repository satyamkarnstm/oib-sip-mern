import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Thanks() {
    const navigate=useNavigate()
    const{state}=useLocation()
    if (!state) {
        return navigate('/home')
    }
  return (
    <div>
        <h2>Thanks for using our service</h2>
        <h4>your order is processing</h4>
        <button onClick={()=>navigate('/home')}>give new order</button>

    </div>
  )
}

export default Thanks