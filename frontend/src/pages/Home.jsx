import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useAuthStore from "../store/authStore";
import ThemeToggle from "../components/ThemeToggle";

import { fetchCart } from "../api/cartApi";

const Home = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // ✅ React Query CART (replaces Zustand)
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    enabled: !!user, // only fetch when logged in
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans">
      
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-indigo-600 text-white p-2 rounded-xl ">
              ⚡
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              NexShop
            </h1>
          </div>

          <div className="flex items-center space-x-6">

            <ThemeToggle />

            <button
              onClick={() => navigate('/shop')}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-medium"
            >
              Shop
            </button>

            {!user ? (
              <div className="flex items-center space-x-4">
                <button onClick={() => navigate("/login")}>
                  Log in
                </button>
                <button onClick={() => navigate("/signup")}>
                  Sign up free
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">

                {/* Cart */}
                <button
                  onClick={() => navigate('/cart')}
                  className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  🛒

                  {/* SAME UI */}
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                      {cart.length}
                    </span>
                  )}
                </button>

                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Hi, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section (UNCHANGED) */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">

        <div className="max-w-4xl text-center relative z-10">

          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Everything you need,
            <span className="text-indigo-600"> delivered beautifully.</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-10">
            Experience shopping reimagined.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="px-8 py-4 bg-indigo-600 text-white rounded-full"
          >
            Shop Collection
          </button>

        </div>
      </main>
    </div>
  );
};

export default Home;