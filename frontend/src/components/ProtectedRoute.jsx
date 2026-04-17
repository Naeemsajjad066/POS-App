import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user)

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Otherwise, render the child component
  return children
}

export default ProtectedRoute
