import React from 'react'
import { useState } from 'react'
import { successMessage } from '../utilities/toastify';

import PizzaBase from './PizzaBase';
import Souces from './Souces';
import Cheese from './Cheese';
import Vegitables from './Vegitables';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

function Home() {
  const [orders, setOrders] = useState([]);
  const socket = io("http://localhost:8080");
  const storeId = "SIT933SA"

  useEffect(() => {
   socket.emit("registerStore",storeId);
   socket.on("newOrder", (orderData) => {
   setOrders(prev => [...prev, orderData]);
   });
   return () => {
      socket.off("newOrder");
    };
  }, []);

  console.log('new order',orders);

  return (
    <div>Home
      <h3>here you will get your new order</h3>
      <div>
            {orders.map((n,i)=>(
                <div key={i}>
                    <p>costomer name:{n.user.name}</p>
                    <p>Souces:{n.item.Souces.name}</p>
                    <p>Cheese:{n.item.Cheese.name}</p>
                    <p>Vegs:{n.item.Vegs.name}</p>
                    <button>confirm</button>
                </div>
            ))}
        </div>
      
      
    </div>
  )
}

export default Home