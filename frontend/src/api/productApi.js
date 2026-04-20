import API from "../api";

export const fetchProducts = async () => {
    const res = await API.get('/products')
    return res.data.products
}

export const createProduct = async (productData) => {
    const res = await API.post("/products", productData)
    return res.data
}

export const deleteProduct=async (id)=>{
    const res=await API.delete(`/products/${id}`)
    return res.data
}