import { create } from 'zustand'
import API from '../api'
import { toast } from 'react-toastify'

const useProductStore = create((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    try {
      set({ loading: true })
      const res = await API.get("/products")
      set({
        products: res.data.products || res.data,
        loading: false
      })
    } catch (error) {
      set({ loading: false })
      console.log(error)
    }
  },

  addProduct: async (productData) => {
    try {
      set({ loading: true })
      const res = await API.post("/products", productData)
      toast.success(res.data.message)
      set((state) => ({
        products: [res.data.product, ...state.products],
        loading: false
      }))
      return true;
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || "Failed to add product")
      return false;
    }
  }
}))

export default useProductStore
