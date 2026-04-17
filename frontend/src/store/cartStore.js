import {create} from 'zustand'
import API from '../api'


const useCartStore=create((set)=>({
    cart:[],
    loading:false,
    totalPrice:0,
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
    removeFromCart:async(id)=>{
        try {
            await API.delete(`/cart/${id}`)
            set((state)=>({
                cart:state.cart.filter((item)=>item.id!==id)
            }))
        } catch (error) {
            console.log(error)
        }
    },
    fetchCart:async()=>{
        try {
            set({loading:true})
            const res=await API.get("/cart")

            set({
                cart:res.data,
                loading:false
            })
        } catch (error) {
            set({loading:false})
            console.log(error)
        }
    },
    addToCart:async(product)=>{
        try {
            const res =await API.post("/cart",product)
            set((state)=>(
                {
                    cart:[...state.cart,res.data.cartItem]
                }
            ))
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useCartStore