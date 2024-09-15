import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
  import "./createpost.css"
  import service  from '../appwrite/config.js'
import { useSelector } from 'react-redux'

export const Createpost = () => {
  const {register,handleSubmit}=useForm()
  let data = useSelector(state => state.doc.data)   
function submit(e) {
  service.getUser().then((res)=>{
    console.log("response of createpost", res)
  })
  const imagelink = service.uploadImage(e.image[0]).then((res)=>{
    console.log(res.$id)
    const createdocument = service.createDocument(
      {
        "TITLE":String(e.title),
        "CONTENT": String(e.description),
        "FEATURED_IMAGE": String(res.$id),
        "STATUS": String(e.status),
        "USER_ID":String(data.data.$id) ,
      }
    
    ).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    
  console.log("created document is ",createdocument)

    return res.$id
    
  }).catch((err)=>{
    console.log(err)
  })
  // console.log(data.data.$id) 

} 
  return (
    <>
    <form onSubmit={handleSubmit(submit)}>
      <input type="text" placeholder='title' {...register('title')}/>
      <input type="text" placeholder='description' {...register('description')}/>
      <input type="file" placeholder='image' {...register('image')}/>
      <select name="" id="" {...register('status')}>
      <option value={true}>isActive</option>
      <option value={false}>NonActive</option>
      
      </select>
      <input type="submit" placeholder='Submit'value={"submit"} {...register('submit')}/>



    </form>

    </>
  )
}
