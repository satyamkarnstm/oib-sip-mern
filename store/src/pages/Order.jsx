import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {io} from 'socket.io-client'

function Order() {
    const [orders, setOrders] = useState([]);
  const socket = io("http://localhost:8080");
  const storeId = "SIT933SA"

    useEffect(() => {
    // Register store
    console.log('yes');
    
   socket.emit("registerStore",storeId);
  //  console.log('bf',bv);
   

    // Listen for new orders
    socket.on("newOrder", (orderData) => {
      console.log('jj');
      
      setOrders(prev => [...prev, orderData]);
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);

  console.log('hgfr',orders);
  
  return (
    <div>Order
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

export default Order