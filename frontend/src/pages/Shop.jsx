import React from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'

const products = [
  { id: 1, name: "Shampoo", price: "$12.99", emoji: "🧴", category: "Personal Care" },
  { id: 2, name: "iPhone", price: "$999.00", emoji: "📱", category: "Electronics" },
  { id: 3, name: "Sharpener", price: "$2.49", emoji: "✏️", category: "Stationery" },
  { id: 4, name: "Headphones", price: "$149.00", emoji: "🎧", category: "Electronics" },
  { id: 5, name: "Water Bottle", price: "$19.99", emoji: "🍶", category: "Lifestyle" },
  { id: 6, name: "Notebook", price: "$7.99", emoji: "📓", category: "Stationery" },
]

const Shop = () => {
  const addToCart = useCartStore((state) => state.addToCart)
  const cart = useCartStore((state) => state.cart)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">🛍️ Shop</h1>
            <p className="text-xs text-gray-400">Browse and add to your cart</p>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="relative flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            🛒 Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">All Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between group"
            >
              {/* Product Icon & Info */}
              <div>
                <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-200">
                  {p.emoji}
                </div>
                <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {p.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2">{p.name}</h3>
                <p className="text-indigo-600 font-semibold text-base mt-1">{p.price}</p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart({ product: p.name, quantity: 1 })}
                className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-150"
              >
                + Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shop