import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useProductStore from '../store/productStore'

const Shop = () => {
  const addToCart = useCartStore((state) => state.addToCart)
  const cart = useCartStore((state) => state.cart)
  
  const products = useProductStore((state) => state.products)
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const addProduct = useProductStore((state) => state.addProduct)
  const loading = useProductStore((state) => state.loading)
  
  const navigate = useNavigate()

  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: "", price: "" })

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    
    const success = await addProduct({
      name: newProduct.name,
      price: Number(newProduct.price)
    });
    
    if (success) {
      setNewProduct({ name: "", price: "" })
      setShowAddForm(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">🛍️ Shop</h1>
            <p className="text-xs text-gray-400">Browse and add to your cart</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl transition"
            >
              {showAddForm ? "Cancel" : "+ Add Product"}
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="relative flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              🛒 Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 mb-10 w-full max-w-md animate-fade-in-down">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Create New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="E.g. Wireless Mouse"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs. )</label>
                <input 
                  type="number"
                  step="0.01"
                  min="0"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="999"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Product"}
              </button>
            </form>
          </div>
        )}

        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          All Products
        </h2>

        {products.length === 0 && !loading ? (
           <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
             <div className="text-5xl mb-4">🏪</div>
             <h3 className="text-lg font-bold text-gray-800 mb-2">No products found</h3>
             <p className="text-gray-500">Add some products to your store to get started.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between group border border-gray-50"
              >
                {/* Product Info */}
                <div>
                  <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-200">
                    🛍️
                  </div>

                  <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                    General
                  </span>

                  <h3 className="text-lg font-bold text-gray-800 mt-2">
                    {p.name}
                  </h3>

                  <p className="text-indigo-600 font-semibold text-base mt-1">
                    Rs. {p.price}
                  </p>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() =>
                    addToCart({
                      productId: p.id,
                      quantity: 1,
                    })
                  }
                  className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-150"
                >
                  + Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop