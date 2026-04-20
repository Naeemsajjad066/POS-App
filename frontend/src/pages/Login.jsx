import React from 'react'
import { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuthStore from '../store/authStore'

const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const login = useAuthStore((state) => state.login)
    const fetchUser = useAuthStore((state) => state.fetchUser)
    const user = useAuthStore((state) => state.user)
    const handleOnchange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await API.post("/auth/login", form);
            login(res.data.token)
            await fetchUser()
            toast.success(res.data.message);
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
    if (user) {
        navigate("/")
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-5"
            >
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">
                        Login to continue
                    </p>
                </div>

                {/* Email */}
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="Enter your email"
                    onChange={handleOnchange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Password */}
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="Enter your password"
                    onChange={handleOnchange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
                >
                    Login
                </button>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-indigo-600 font-medium cursor-pointer hover:underline"
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login
