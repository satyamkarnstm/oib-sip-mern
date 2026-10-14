import {toast} from 'react-toastify'

 export const successMessage=(message)=>{
    toast.success(message)
}

export const errorMessage=(message)=>{
    toast.error(message,{position:"top-center"})
}