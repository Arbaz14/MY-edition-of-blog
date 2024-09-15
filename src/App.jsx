import { useEffect, useState } from "react";
import "./App.css";
import service from "../src/components/appwrite/config.js"; // Ensure this path is correct
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/docsslice.js";
import { set } from "react-hook-form";

function App() {
  const [statu, setstatu] = useState()
  const dispatch = useDispatch();
  const status = useSelector((state)=>{
    return state.doc.status
  })
useEffect(()=>{
  service.getUser().then((response)=>{
    console.log(response);
    dispatch(login({data:response}))
    
    
    setstatu(status)
  }).catch((error)=>{
    console.log(error);
    setstatu(false)
    dispatch(logout())
  })
},[status])

// console.log(status)
return(
  
  <>
{
  statu ? <h1>Welcome to the dashboard</h1> : <h1>Please Login</h1>
}
  </>
)


}
export default App;
