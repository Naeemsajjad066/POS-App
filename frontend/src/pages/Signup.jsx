import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import { toast } from 'react-toastify'
import useAuthStore from '../store/authStore'

const Signup = () => {
  const user=useAuthStore((state)=>state.user)
    const [form, setForm]=useState({
        name:"",
        email:"",
        password:""
    })
    const navigate=useNavigate()
    const handleOnchange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res=await API.post("/auth/signup",form)
            toast.success(res.data.message)
            navigate("/login")

        } catch (error) {
            toast.error(error.response?.data?.message || "Error")
        }
    }
if(user){
  navigate("/")
}
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-5"
    >
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-500 text-sm">
          Join our platform today
        </p>
      </div>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={form.name}
        onChange={handleOnchange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleOnchange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={handleOnchange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
      >
        Sign Up
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-indigo-600 font-medium cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </form>
  </div>
);
}

export default Signup
