import { id } from "zod/v4/locales";
import prisma from "../db/prismaClient.js";


export const addProduct = async (req, res) => {
    try {
        const { name, price } = req.body || {};

        if (!name || !price) {
            return res.status(400).json({ message: "Name and Price is required" })
        }
        const existing = await prisma.product.findFirst({
            where: { name },
        });

        if (existing) {
            return res.status(400).json({
                message: "Product already exists",
            });
        }
        const product = await prisma.product.create({
            data: {
                name,
                price: Number(price)
            }
        })

        res.status(201).json({
            message: "Product is added",
            product
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getProducts=async(req,res)=>{
    try {
        const products=await prisma.product.findMany({
            orderBy:{
                id:"desc"
            }
        })
        res.status(200).json({
            message:"Products Fetched Successfully",
            products,
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}