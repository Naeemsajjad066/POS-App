import React from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'

const Cart = () => {
    const cart = useCartStore((state) => state.cart)
    const loading = useCartStore((state) => state.loading)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const emptyCart = useCartStore((state) => state.emptyCart)
    const navigate = useNavigate()
    const setLoading = useCartStore((state) => state.setLoading)

    const handleCheckOut = () => {
        setLoading(true)
        setTimeout(() => {
            navigate("/thankyou")
            setLoading(false)
        }, 2000);
    }
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-indigo-600 text-lg font-semibold animate-pulse">Loading cart...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-indigo-600">🛒 My Cart</h1>
                    <button
                        onClick={() => navigate('/shop')}
                        className="text-sm text-indigo-600 hover:underline font-medium"
                    >
                        ← Continue Shopping
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-10">

                {/* Empty State */}
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="text-7xl mb-4">🛍️</div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                        <p className="text-gray-400 text-sm mb-6">Looks like you haven't added anything yet.</p>
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
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition"
                                >
                                    {/* Left — product info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl">
                                            🛒
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 text-base">{item.product?.name || "Unknown Product"}</h3>
                                            <p className="text-xs text-gray-400 mt-0.5">Item #{item.id}</p>
                                        </div>
                                    </div>

                                    {/* Right — quantity badge */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500">Qty</span>
                                        <span className="bg-indigo-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className='bg-amber-100 p-3 w-20 rounded-sm cursor-pointer hover:bg-amber-600' onClick={() => removeFromCart(item.id)}>Delete</div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span>Total Items</span>
                                <span className="font-medium text-gray-700">{cart.length}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500 mb-4">
                                <span>Total Quantity</span>
                                <span className="font-medium text-gray-700">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-gray-800 text-base">
                                <span>Total Price</span>
                                <span className="text-indigo-600">
                                    Rs. {cart.reduce((sum, item) => sum + (item.quantity * (item.product?.price || 0)), 0).toFixed(2)}
                                </span>
                            </div>
                            <button onClick={async () => {
                                handleCheckOut();
                                await emptyCart();
                            }} className="mt-5 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition-all duration-150">
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
