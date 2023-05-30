import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useContext, } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes=({ children })=>{
  const { user } = useContext(AuthContext)
  if (user.state) {
    return (children ? children : <Outlet />)
  } else {
    return <Navigate to="/Login"/>
  }
}
export default ProtectedRoutes