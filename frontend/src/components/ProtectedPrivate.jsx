import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedPrivate({ children, permisos=[0] }) {
    const { user } = useContext(AuthContext)

    if (user.state) {
        if (permisos.includes(user.usuario.id_cargo)) {

            return (children ? children : <Outlet />)

        } else {
            return <Navigate to="/Inicio"/>
        }
    } else {
        return <Navigate to="/Login"/>
    }
}

export default ProtectedPrivate