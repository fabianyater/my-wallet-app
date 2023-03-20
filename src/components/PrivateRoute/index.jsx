import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'

export default function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext)
  return (
    <>
      {auth.token ? children : <Navigate to="/" />}
    </>
  )
}
