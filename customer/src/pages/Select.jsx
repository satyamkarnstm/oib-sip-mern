import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


function Select() {
  const[pizzabase,setPizzaBase]=useState([])
  const[souces,setSouces]=useState([])
  const[cheese,setCheese]=useState([])
  const[vegs,setVegs]=useState([])
  const[frems,setFrems]=useState(1)
  const[order,setOrder]=useState({storeId:'',Pizzabase:{},Souces:{},Cheese:{},Vegs:{}})
  const nevigate=useNavigate()
  const{state}= useLocation()
  
  // for get pizza base
  const getpzzabase=async (storeId) => {
      try {
        const req= await fetch(`http://localhost:8080/auth/getpizzabase/${storeId}`)
        const result=await req.json()
        setPizzaBase(result)
      } catch (error) {
        console.log(error);
      }
    }
  
    // for get souces
    const getsouces=async (storeId) => {
      try {
        const req= await fetch(`http://localhost:8080/auth/getsouces/${storeId}`)
        const result=await req.json()
        setSouces(result)
      } catch (error) {
        console.log(error);
      }
    }
  
    // for get cheese
    const getcheese=async (storeId) => {
      try {
        const req= await fetch(`http://localhost:8080/auth/getcheese/${storeId}`)
        const result=await req.json()
        setCheese(result)
      } catch (error) {
        console.log(error);
      }
    }

  //for get vegs
    const getvegs=async (storeId) => {
      try {
        const req= await fetch(`http://localhost:8080/auth/getveg/${storeId}`)
        const result=await req.json()
        setVegs(result)
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
        if (!state) {
          return nevigate('/home')
          }
        getpzzabase(state.storeId)
        getsouces(state.storeId)
        getcheese(state.storeId)
        getvegs(state.storeId)
        setOrder({...order,storeId:state.storeId})
    },[])


    // for slide next for choose in next items
    const nextHandler=()=>{
    if (frems>=4){return setFrems(4)}
   return setFrems(frems+1)  
  }
  // for slide back for choose in previous items
  const prevHandler=()=>{
    if (frems<=1){return setFrems(1)}
   return setFrems(frems-1)  
  }
  
  // for detact select from item
  const ChangeHandler=(e)=>{
    const{name,value}=e.target;
    const copyvalues={...order,storeId:state.storeId}
    copyvalues[name]=value
    setOrder(copyvalues)
  }

  // for submit selected items
  const submitHandler=async (e) => {
    e.preventDefault()
    if (!order.Pizzabase || !order.Souces || !order.Cheese || !order.Vegs) {
      return alert('please choose in all')
    }
    nevigate('/order',{state:{orderItems:order}})
  }
  console.log(order);
  
  return (
    <div>Select
      <form method="post" onSubmit={submitHandler}>
        {frems==1&&
        <div className='selection-box'>
        <h3>select your favorite pizza base</h3>
        <div className="grid3">
          <h4>select</h4>
          <h4>name</h4>
          <h4>price</h4>
        </div>
        {pizzabase.map((n)=>(
        <div key={n._id} className='grid3'>
        <input type="radio" name="Pizzabase" onChange={()=>setOrder({...order,Pizzabase:{name:n.name,price:n.rate}})} required /> {n.name}
        
        <span>{n.rate}</span>
        <input type="hidden" name="pizzabaseprice" value={n.rate} onChange={ChangeHandler}/>
        </div>))}
        
        <div className="grid2">
          <div></div>
        <button type='button' onClick={nextHandler} className='scroller right'>next</button>
        </div>
        </div>  
      }
      {frems==2&&
        <div className='selection-box'>
        <h3>select your favorite souce</h3>
        <div className="grid3">
          <h4>select</h4>
          <h4>name</h4>
          <h4>price</h4>
        </div>
        {souces.map((n)=>(
        <div key={n._id} className='grid3'>
        <input type="radio" name="Souces" onChange={()=>setOrder({...order,Souces:{name:n.name,price:n.rate}})}required />{n.name} 
        <span>{n.rate}</span>
        <input type="hidden" name="souceprice" value={n.rate} onChange={ChangeHandler}/>
        </div>))}
        <div className="grid2">
        <button type='button' className='scroller left' onClick={prevHandler}>prev</button>
        <button type='button' className='scroller right' onClick={nextHandler}>next</button>
        </div>
       </div>  
      }
      {frems==3&&
        <div className='selection-box'>
        <h3>select your favorite cheese</h3>
        <div className="grid3">
          <h4>select</h4>
          <h4>name</h4>
          <h4>price</h4>
        </div>
       {cheese.map((n)=>(
        <div key={n._id} className='grid3'>
          <input type="radio" name="Cheese" onChange={()=>setOrder({...order,Cheese:{name:n.name,price:n.rate}})} required/>{n.name}
          <span>{n.rate}</span>
          <input type="hidden" name="cheeseprice" value={n.rate} onChange={ChangeHandler}/>  
        </div>))}
        <div className="grid2">
        <button type='button' className='scroller left' onClick={prevHandler}>prev</button>
        <button type='button' className='scroller right' onClick={nextHandler}>next</button>
        </div>
       </div>  
      }
      {frems==4&&
        <div className='selection-box'>
        <h3>select your favorite vegs</h3>
        <div className="grid3">
          <h4>select</h4>
          <h4>name</h4>
          <h4>price</h4>
        </div>
       {vegs.map((n)=>(
        <div key={n._id} className='grid3'>
        <input type="radio" name="Vegs" onChange={()=>setOrder({...order,Vegs:{name:n.name,price:n.rate}})} required/>{n.name}
        <span>{n.rate}</span>
        <input type="hidden" name="vegprice" value={n.rate} onChange={ChangeHandler}/>
        </div>))}
        <div className="grid2">
        <button type='button' className='scroller left' onClick={prevHandler}>prev</button>
        <button type='submit' className='scroller right' >order</button>
        </div>
       </div>  
      }
      </form>
      
    </div>
  )
}

export default Select