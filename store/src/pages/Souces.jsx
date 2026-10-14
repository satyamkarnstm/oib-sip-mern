import React from 'react'
import { useState } from 'react'
import { successMessage } from '../utilities/toastify'
import { useEffect } from 'react'

function Souces({storeId}) {
  const [values,setValues]=useState({storeId:`${storeId}`, name:'', rate:0, stock:0})
  const [pizzaBase,SetPizzabase]=useState([])
  const [formdisplay,setFormdisplay]=useState(false)
  const [stocsform,setStockform]=useState(false)
  const [stocks,setstocks]=useState({name:'',number:0})
   
  // for detcting change in variables for add new souce
  const changeHandler=(e)=>{
    const {name,value}=e.target;
    const copyValues={...values}
    copyValues[name]=value
    setValues(copyValues)
 }

 // for add new souce 
  const sumbitHandler=async (e) => {
    e.preventDefault()
    try {
      const url="http://localhost:8080/stores/addsouce"
      const request= await fetch(url,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(values)
      })
      const result=await request.json()
      successMessage(result.message)
      setTimeout(() => {
        getsouces()
      }, 100);
      } catch (error) {
      console.log(error);
    } 
  }

  // for get all souces from store
  const getsouces=async () => {
    try {
      const req= await fetch(`http://localhost:8080/stores/getsouces/${storeId}`)
      const res=await req.json()
      SetPizzabase(res)  
    } catch (error) {
        console.log(error);
    }
  }
   
  // for delete particular souce
  const delsouces=async (id,storeId) => {    
    try {
      const req=  await fetch(`http://localhost:8080/stores/delsouce`,{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({id,storeId})
    })
    const result= await req.json()
    successMessage(result.message)
    setTimeout(() => {
      getsouces()
    }, 100);
    } catch (error) {
        console.log(error);
    }
  }

  // for increase stocks of particular item        
  const increasestore=async (e) => {
    e.preventDefault()   
    try {
      const req=  await fetch(`http://localhost:8080/stores/increasesouce`,{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({name,item:stocks,storeId:`${storeId}`})
        })
      const result= await req.json()
      setStockform(false)
      successMessage(result.message)
          setTimeout(() => {
            getsouces()
      }, 100);
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getsouces()
  },[])
  return (
    <div>Souces
        <div className='itemContainer'>
        <p>name</p>
        <p>rate</p>
        <p>stocks</p>
        </div>
        {pizzaBase.map((val)=>(
            <div key={val._id} className='items itemContainer'>
            <p>{val.name}</p>
            <p>{val.rate}</p>
            <p>{val.stock}</p>
            {stocsform?
              <form  method="post"onSubmit={increasestore}>
                <input type="number" name={val.name} required autoFocus
                onChange={(e)=>setstocks({name:e.target.name,number:Number(e.currentTarget.value)})}/>
                <button type="submit">add</button>
                <button onClick={()=>setStockform(!stocsform)}>x</button>
              </form>  :
              <button onClick={()=>setStockform(!stocsform)}>add stock</button>
          }
            <button onClick={()=>delsouces(val._id,values.storeId,)}>delete</button>
            </div>
        ))}

        <div>
            {formdisplay?
            <button onClick={()=>setFormdisplay(!formdisplay)}>hide form</button>:
            <button onClick={()=>setFormdisplay(!formdisplay)}>add new souce</button>
            }
        </div>
      
      <div className={formdisplay?"show":"hide"}>
        <form action="" method="post" onSubmit={sumbitHandler}>
        
        <label htmlFor="pizzabase">souce name</label>
        <input type="text" name='name' required onChange={changeHandler} />
        <label htmlFor="rate">rate</label>
        <input type="number" name='rate' required onChange={changeHandler} />
        <label htmlFor="stocks">number</label>
        <input type="number" name='stock' required onChange={changeHandler}/>
        <button type="submit">submit</button>
      </form>
      </div>
      
    </div>
  )
}

export default Souces