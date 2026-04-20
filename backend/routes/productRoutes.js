import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addProduct, getProducts } from '../controllers/productController.js';

const router=express.Router();

router.post('/',authMiddleware,addProduct)
router.get('/',authMiddleware,getProducts)


export default router