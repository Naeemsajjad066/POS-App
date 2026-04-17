import prisma from "../db/prismaClient.js";

export const addToCart=async(req,res)=>{
    try {
        const {product,quantity}=req.body;
        if(!product){
            return res.status(400).json({
                message:"Product is required"
            })
        }

        // const existingItem=await prisma.cart.findFirst({
        //     where:{
        //         userId:req.user.id,
        //         product,
        //     }
        // })

        // if(existingItem){
        //   const updatedItem= await prisma.cart.update({
        //         where:{
        //             id:existingItem.id
        //         },
        //         data:{
        //             quantity:existingItem.quantity + (quantity || 1)
        //         }
        //     })
        //     return res.status(200).json({cartItem:updatedItem})
        // }
        const cartItem=await prisma.cart.create({
            data:{
                userId:req.user.id,
                product,
                quantity:quantity || 1
            }
        })
        res.status(201).json({
            message:"Added to cart ",
            cartItem
        })
    } catch (error) {
        console.log(error,"Error at add to cart")
        res.status(500).json({
            message:"Failed to add Item",
            error:error.message
        })
    }
}

export const getCart=async(req,res)=>{
    try {
        const cart=await prisma.cart.findMany({
            where:{
                userId:req.user.id,
            }
        })
        res.status(200).json(cart)
    } catch (error) {
        console.log("Failed to get Cart",error);
        res.status(500).json({
            message:"Internal Server Error ",
            error:error.message
        })
    }
}

export const deleteCartItem=async(req,res)=>{
    try {
        const id=req.params.id;

        const deletedItem=await prisma.cart.deleteMany({
            where:{
                id:Number(id),
                userId:req.user.id
            }
        })
        res.status(200).json({
            message:"Item deleted from cart",
            deletedItem
        })

    } catch (error) {
        console.log("Error in deleted item cart")
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const EmptyCart=async (req,res)=>{
    try {
         await prisma.cart.deleteMany({
            where:{
                userId:req.user.id,
            }
        })
        res.status(200).json({
            message:"Cart is empty Now"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Issue "
        })
    }
}