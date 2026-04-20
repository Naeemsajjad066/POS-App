import axios from "axios";
import API from "../api";

export const addToCart=async(productId)=>{
    const res=await API.post("/cart",{
        productId,
        quantity:1
    })
    return res
}

export const fetchCart=async()=>{
    const res=await API.get("/cart")
    return res.data
}

export const removeCartItem=async(id)=>{
    const res=await API.delete(`/cart/${id}`)
    return res.data
}

export const emptyCart=async()=>{
    const res=await API.delete("/cart")
    return res.data
}