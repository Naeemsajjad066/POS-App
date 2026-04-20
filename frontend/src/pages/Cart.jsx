import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchCart, removeCartItem, emptyCart } from '../api/cartApi'
import ThemeToggle from '../components/ThemeToggle'

const Cart = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: cartData, isLoading: cartLoading, error: cartError } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart
  })

  const deleteMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })
    }
  })

  const emptyMutation = useMutation({
    mutationFn: emptyCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })
    }
  })

  const handleCheckOut = async () => {
    await emptyMutation.mutateAsync()
    navigate("/thankyou")
  }

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-indigo-600 dark:text-indigo-400 text-lg font-semibold animate-pulse">
          Loading cart...
        </div>
      </div>
    )
  }
  if(cartError){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-indigo-600 dark:text-indigo-400 text-lg font-semibold animate-pulse">
          Loading cart...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">🛒 My Cart</h1>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => navigate('/shop')}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Empty State */}
        {!cartData || cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-4">🛍️</div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
              Looks like you haven't added anything yet.
            </p>

            <button
              onClick={() => navigate('/shop')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">

              {cartData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition"
                >

                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900 flex items-center justify-center text-2xl">
                      🛒
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-base">
                        {item.product?.name || "Unknown Product"}
                      </h3>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Item #{item.id}
                      </p>
                    </div>
                  </div>

                  {/* Quantity + Price */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Qty</span>

                    <span className="bg-indigo-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>

                    <div className="font-semibold text-gray-700 dark:text-gray-200">
                      Rs. {(item.product?.price || 0) * (item.quantity || 0)}
                    </div>
                  </div>

                  {/* Delete */}
                  <div
                    onClick={() => deleteMutation.mutate(item.id)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded cursor-pointer hover:bg-red-500 hover:text-white transition"
                  >
                    Delete
                  </div>

                </div>
              ))}

            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">

              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>Total Items</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {cartData.length}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>Total Quantity</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {cartData.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between font-bold text-gray-800 dark:text-gray-100 text-base">
                <span>Total Price</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  Rs.{" "}
                  {cartData
                    .reduce(
                      (sum, item) =>
                        sum +
                        (item.quantity * (item.product?.price || 0)),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckOut}
                className="mt-5 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition"
              >
                Checkout →
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart