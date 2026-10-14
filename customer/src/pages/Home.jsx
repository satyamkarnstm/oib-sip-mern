import React from 'react'
import { useEffect } from 'react'
import { errorMessage, successMessage } from '../utilities/tostify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import { getsouces } from '../../../backend/controller/orderController'

function Home(prop) {
  const[stores,setStores]=useState([])
  const navigate = useNavigate()

  // for get all stores
  const getStores=async () => {
    try {
      const req= await fetch("http://localhost:8080/auth/getstore")
      const result=await req.json()
      setStores(result)
    } catch (error) {
      console.log(error);
    }
  }

  
  
  useEffect(()=>{
    
     getStores()
    
  },[])


  
  return (
    <div>
      <div>
        <h3 id='hj'></h3>
        <p>
          we are providing differernt kind of testy pizza on our all stores,<br />
          from below list of our stores, you can choose your nearest store
        </p>

      </div>
      
      <div>
      
      {stores.map((n)=>(
        <div key={n._id} className='box'onClick={()=>navigate('/select',{state:{storeId:n.storeId,name:n.name}})
}>
        <p>{n.name}, {n.place}</p>
        
        </div>))}

      </div>  
      
      
    
    </div>
  )
}

export default Home
