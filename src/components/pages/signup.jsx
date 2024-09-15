import React from 'react'
import { useForm } from 'react-hook-form'
import service  from '../appwrite/config.js'

export const Signup = () => {
const {register,handleSubmit , formState:{errors}} = useForm()

function submit(e){
    service.signup(e).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
    console.log(e)



}


  return (
    <form action=""onSubmit={handleSubmit(submit)} >
        <input type="text"  className='bg-red-300 border-solid border-black border-2 p-4 m-4 text-black placeholder-black ' placeholder='Name' {...register('name', {required:true,minLength:3})} />
        <input type="text"  className='bg-red-300 border-solid border-black border-2 p-4 m-4 text-black placeholder-black ' placeholder='email' {...register('email', {required:true,pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}/>
        <p>{errors.email && "email is required"}</p>
        <input type="text" placeholder='password' className='placeholder-black bg-red-300  border-solid border-black border-2 p-4 m-4 text-black ' {...register('password',{required:true ,minLength:6})}/>
        <p>{errors.password && "password is required"}</p>
        <input type="submit" value="submit" className='bg-red-300 border-solid border-black border-2 p-4 m-4 text-black     ' />
    </form>
    
  )
}


