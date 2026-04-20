import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addProduct, deleteProduct, getProducts } from '../controllers/productController.js';

const router=express.Router();

router.post('/',authMiddleware,addProduct)
router.get('/',authMiddleware,getProducts)
router.delete('/:id',authMiddleware,deleteProduct)

export default router