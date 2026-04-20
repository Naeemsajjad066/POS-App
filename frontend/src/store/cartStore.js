import {create} from 'zustand'
import API from '../api'


const useCartStore=create((set)=>({
    cart:[],
    loading:false,
    totalPrice:0,
    products:[],
setLoading: (bool) => {
    set({ loading: bool });
},
    emptyCart:async()=>{
        try {
            await API.delete('/cart')
            set({cart:[]})
        } catch (error) {
            console.log(error)
        }
    },
removeFromCart: async (id) => {
  try {
    await API.delete(`/cart/${id}`);

    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  } catch (error) {
    console.log(error);
  }
},
fetchCart: async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    set({ loading: true });

    const res = await API.get("/cart");

    set({
      cart: res.data,
      loading: false,
    });
  } catch (error) {
    set({ loading: false });
    console.log(error);
  }
},
addToCart: async ({ productId, quantity = 1 }) => {
  try {
    const res = await API.post("/cart", {
      productId,
      quantity,
    });

    set((state) => {
      const existingItemIndex = state.cart.findIndex(item => item.id === res.data.id);
      if (existingItemIndex !== -1) {
        const newCart = [...state.cart];
        newCart[existingItemIndex] = res.data;
        return { cart: newCart };
      }
      return { cart: [...state.cart, res.data] };
    });
  } catch (error) {
    console.log(error);
  }
},
}))

export default useCartStore