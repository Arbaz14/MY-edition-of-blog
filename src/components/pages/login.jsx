import React from 'react'
import { useForm } from 'react-hook-form'
import service  from '../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import {useDispatch } from 'react-redux'
import { login } from '../../store/docsslice.js'

export const Login = () => {
  const navigate = useNavigate()
const {register,handleSubmit , formState:{errors}} = useForm()
const dispatch = useDispatch()
function submit(e){
    service.login(e).then(res=>{
        console.log(res)
      dispatch(login({data:res}))

    }).catch(err=>{
      console.log(err)
    })
    console.log(e)
    
    navigate('/')

}


  return (
    <form action=""onSubmit={handleSubmit(submit)} >
        <input type="email"  className='bg-red-300 border-solid border-black border-2 p-4 m-4 text-black placeholder-black ' placeholder='email' {...register('email', {required:true,pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}/>
        <p>{errors.email && "email is required"}</p>
        <input type="text" placeholder='password' className='bg-red-300  border-solid border-black border-2 p-4 m-4 text-black placeholder-black' {...register('password',{required:true ,minLength:6})}/>
        <p>{errors.password && "password is required"}</p>
        <input type="submit" value="submit" className='bg-red-300 border-solid border-black border-2 p-4 m-4 text-black     ' />
    </form>
    
  )
}
