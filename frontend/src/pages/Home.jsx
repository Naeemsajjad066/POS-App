import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";
import useCartStore from '../store/cartStore'

const Home = () => {
  const navigate = useNavigate();
  const fetchCart = useCartStore((state) => state.fetchCart)
  const cart = useCartStore((state) => state.cart)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCart();
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">NexShop</h1>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/shop')}
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Shop
            </button>
            {!user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95"
                >
                  Sign up free
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/cart')}
                  className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                      {cart.length}
                    </span>
                  )}
                </button>
                <div className="h-8 w-px bg-gray-200"></div>
                <span className="text-gray-700 font-medium">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

        <div className="max-w-4xl text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold tracking-wide uppercase">
            The New Standard in E-Commerce
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Everything you need,<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
              delivered beautifully.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience shopping reimagined. Find the best products, add to your cart, and checkout seamlessly with our lightning-fast platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/shop")}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-1 transition-all duration-300"
            >
              Shop Collection
            </button>
            {!user ? (
              <button
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-300"
              >
                Create Account
              </button>
            ) : (
              <button
                onClick={() => navigate("/cart")}
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-300"
              >
                View My Cart
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Feature Cards Setup */}
      <section className="bg-white py-24 relative z-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why choose us</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">We've built a platform that puts the user experience first, ensuring every interaction is fast, secure, and delightful.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 group selection:bg-indigo-100 border border-gray-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h4>
              <p className="text-gray-600 leading-relaxed">
                Navigate through products instantly without reloading pages. Optimized performance built on modern React patterns.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 group border border-gray-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Bank-grade Security</h4>
              <p className="text-gray-600 leading-relaxed">
                Your data is safe with us. We use industry-standard JWT authentication to ensure your session is always protected.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 group border border-gray-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-2xl">🪄</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Seamless Design</h4>
              <p className="text-gray-600 leading-relaxed">
                A thoughtfully crafted interface that feels intuitive from the first click. Dynamic and responsive across all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p className="text-gray-400">© 2026 NexShop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;