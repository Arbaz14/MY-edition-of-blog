import React from 'react'
import server from "../appwrite/config"
import { NavLink } from 'react-router-dom'
import  './header.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/docsslice'
const Logoutbutton = () => {
   const dispatch = useDispatch()


  return (
    <>
<li><NavLink onClick={()=>{
  dispatch(logout())
  server.logout()
  }} to={"/login"}>Logout</NavLink></li>
    </>
  )
}

export default  Logoutbutton;