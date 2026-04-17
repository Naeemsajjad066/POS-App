import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import useAuthStore from './store/authStore';
import useCartStore from './store/cartStore';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ThankYou from './pages/ThankYou';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const loading = useAuthStore((state) => state.loading)
  const fetchCart = useCartStore((state) => state.fetchCart)
  useEffect(() => {
    fetchUser(),
      fetchCart()
  }, [])
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-indigo-600 text-lg font-semibold animate-pulse">
          Loading...
        </div>
      </div>
    )
  }
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/shop' element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        } />
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />  
        <Route path='/thankyou' element={
          <ProtectedRoute>
            <ThankYou />
          </ProtectedRoute>
        } />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
