import express from 'express'
import { getUser, signin, signup } from '../controllers/authController.js'
import { validate } from '../middleware/validate.js'
import { signinSchema, signupSchema } from '../schemas/authSchema.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router =express.Router()

router.post("/signup",validate(signupSchema),signup)
router.post("/login",validate(signinSchema),signin)
router.get("/me",authMiddleware,getUser)
export default router;