import express from 'express'
import authRoutes from './routes/authRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import cors from 'cors'

const app=express();
app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/cart",cartRoutes)
export default app