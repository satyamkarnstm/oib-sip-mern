import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { errorMessage, successMessage } from '../utilities/tostify'

function Register() {
    const [values,setValues]=useState({name:"",email:"",password:""})
    const navigate=useNavigate()
    const changeHandler=(e)=>{
        const {name,value}=e.target
        //console.log(name,value);
        const copyValue={...values}
        copyValue[name]=value
        setValues(copyValue)
        //console.log(values);
        
    }
    const submitHandler=async(e)=>{
        e.preventDefault()
        try {
            const url="http://localhost:8080/auth/signup"
            const req= await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(values)

            })
            const result= await req.json()
            console.log('result',result);
            const {success,message,}=result
            if (success==true) {
                navigate('/varification',{state:{email:values.email}})
                successMessage(message)
            }else{
                errorMessage(message)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className='formcontainer'>
        <h3>Register</h3>
        <form action='' method="post" onSubmit={submitHandler}>
            <label htmlFor="name">name</label>
            <input type="text" name="name" required onChange={changeHandler} autoFocus />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required onChange={changeHandler}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required onChange={changeHandler}/>
            <div className="submit">
              <button type="submit">Submit</button>
            </div>
            <p>already have an account?
            <Link to="/login">login</Link>
            </p>
        </form>
    </div>
  )
}

export default Register