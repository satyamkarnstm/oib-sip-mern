import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {io} from 'socket.io-client'

function Order({user}) {
  const navigate=useNavigate()
  const{state}=useLocation()
  if (!state) {
    return navigate('/home')
  }
  const orderItems=state.orderItems
  
  console.log(orderItems,user);
  const totalcost= orderItems.Pizzabase.price+orderItems.Souces.price+orderItems.Cheese.price+orderItems.Vegs.price;

  const setOrders=async () => {
      //  socket.emit("sendOrder", {storeId:'SIT933SA', item: orderItems,user, time: new Date().toISOString() });
    try {
    
      const url="http://localhost:8080/auth/setorder"
      const req= await fetch(url,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({orderItems,user,storeId:state.storeId})
      })
      const order= req.json()


      const options = {
      key:"rzp_test_Tm4EX5JlU4nFE8",
      amount: totalcost*100,
      currency: "INR",
      name: "Test Payment",
      order_id: order.id,
      handler: function (response) {
        console.log("Payment Success:", response);
        const socket = io("http://localhost:8080");
        socket.emit("sendOrder", {storeId:'SIT933SA', item: orderItems,user, time: new Date().toISOString() });
        navigate("/thanks",{state:{status:true}})

      },
      theme: { color: "#3399cc" }
    };

    const razor = new window.Razorpay(options);
    razor.open();
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    //setOrders()
  },[])
  
  
    
  return (
    <div>
      <h2>Your Bill</h2>
      <div className='bill'>
        <div className="vhb">
        <h3>store name: {orderItems.storeId}</h3>
        <h3>customer name: {user.name}</h3>
        </div>
      
      
      <h2>your order details </h2>
      
      
      <div className='vhb'>
        <div className="grid2">
        <p>name</p>
        <p>rate</p>
      </div><hr />
        <p>pizza base</p>
        <div className='grid2'>
          
          <p>{orderItems.Pizzabase.name}</p>
          <p>{orderItems.Pizzabase.price}</p>
        </div><hr />
        <p>Souces</p>
        <div className='grid2'>
          
          <p>{orderItems.Souces.name}</p>
          <p>{orderItems.Souces.price}</p>
        </div><hr />
        <p>Cheese</p>
        <div className='grid2'>
          
          <p>{orderItems.Cheese.name}</p>
          <p>{orderItems.Cheese.price}</p>
        </div><hr />
        <p>Vegs</p>
        <div className='grid2'>
          
          <p>{orderItems.Vegs.name}</p>
          <p>{orderItems.Vegs.price}</p>
        </div>
      </div>
      <div className='grid2'>
        <p>total</p>
        <p>total:{totalcost}</p> 
      </div>
        
        
    </div>
    <button onClick={setOrders} className='cyo'>confirm your order</button>
    </div>
  )
}

export default Order