import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchProducts, createProduct, deleteProduct } from '../api/productApi'
import { fetchCart, addToCart } from '../api/cartApi'
import ThemeToggle from '../components/ThemeToggle'
import { toast } from 'react-toastify'

const Shop = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: productsData, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  })

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart
  })

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })
    }
  })

  const addMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"]
      })
    }
  })
  const deleteMutation=useMutation({
    mutationFn:deleteProduct,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["products"]
      })
    }
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: "", price: "" })
  const handleAddProduct = (e) => {
    e.preventDefault()

    if (!newProduct.name || !newProduct.price) return

    addMutation.mutate({
      name: newProduct.name,
      price: Number(newProduct.price)
    })
    toast.success("Product added")
    setNewProduct({ name: "", price: "" })
    setShowAddForm(false)
  }
  const handleDelete=(id)=>{
    deleteMutation.mutate(id)
  }

  if (productsLoading) return <p>Loading data...</p>
  if (productsError) return <p>Error loading products</p>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div  onClick={()=>navigate('/')} className="flex items-center gap-2 cursor-pointer">
            <div className="bg-indigo-600 text-white p-2 rounded-xl ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">NexShop</h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900 px-4 py-2 rounded-xl cursor-pointer"
            >
              {showAddForm ? "Cancel" : "+ Add Product"}
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="relative flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl cursor-pointer"
            >
              🛒 Cart
              {cartData?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartData.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-10 max-w-md">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Create New Product</h2>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <button
                type="submit"
                disabled={addMutation.isPending}
                className="w-full bg-indigo-600 text-white py-2 rounded cursor-pointer"
              >
                {addMutation.isPending ? "Saving..." : "Save Product"}
              </button>
            </form>
          </div>
        )}

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">All Products</h2>

        {!productsLoading && productsData?.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

{productsData?.map((p) => (
  <div
    key={p.id}
    className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between"
  >
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        {p.name}
      </h3>

      <p className="mt-2 text-indigo-600 dark:text-indigo-400 font-bold text-md">
        Rs. {p.price}
      </p>
    </div>

    <div className="mt-5 space-y-3">
      
      <button
        onClick={() => addToCartMutation.mutate(p.id)}
        disabled={
          addToCartMutation.isPending &&
          addToCartMutation.variables === p.id
        }
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
      >
        {addToCartMutation.isPending &&
        addToCartMutation.variables === p.id
          ? "Adding..."
          : "🛒 Add to Cart"}
      </button>

      <button
        onClick={() => handleDelete(p.id)}
        className="text-xs text-red-500 dark:text-red-400 hover:underline text-right cursor-pointer"
      >
        Delete
      </button>

    </div>
  </div>
))}

          </div>
        )}
      </div>
    </div>
  )
}

export default Shop