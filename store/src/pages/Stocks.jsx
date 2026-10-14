import React, { useEffect } from 'react'
import PizzaBase from './PizzaBase'
import Souces from './Souces'
import Cheese from './Cheese'
import Vegitables from './Vegitables'
import { useLocation } from 'react-router-dom'

function Stocks({storeId}) {
  
  return (
    <div>Stocks
        <PizzaBase storeId={storeId}/>
      <Souces storeId={storeId}/>
      <Cheese storeId={storeId}/>
      <Vegitables storeId={storeId}/>
    </div>
  )
}

export default Stocks