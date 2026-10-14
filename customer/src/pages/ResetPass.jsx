import React from 'react'
import { useParams } from 'react-router-dom';

function ResetPass() {
    const param = useParams()
    console.log('nhn',param.id);
    
  return (
    <div>ResetPass</div>
  )
}

export default ResetPass