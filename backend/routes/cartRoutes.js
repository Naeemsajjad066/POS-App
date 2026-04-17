import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { addToCart, deleteCartItem, EmptyCart, getCart } from '../controllers/cartController.js'
const router=express.Router()


router.post("/",authMiddleware,addToCart)
router.get("/",authMiddleware,getCart)
router.delete("/:id",authMiddleware,deleteCartItem)
router.delete("/",authMiddleware,EmptyCart)

export default router