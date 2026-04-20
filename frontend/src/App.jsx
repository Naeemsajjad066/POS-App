import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import useThemeStore from './store/themeStore'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import ThankYou from './pages/ThankYou'
import ProtectedRoute from './components/ProtectedRoute'
import useAuthStore from './store/authStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
  const theme = useThemeStore((state) => state.theme)
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const loading = useAuthStore((state) => state.loading)

 useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

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
    <div className='min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white'  > 
         <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route
          path='/shop'
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />

        <Route
          path='/cart'
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path='/thankyou'
          element={
            <ProtectedRoute>
              <ThankYou />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </QueryClientProvider></div>

  )
}

export default App