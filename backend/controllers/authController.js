import { createUser, findUserByEmail } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import prisma from "../db/prismaClient.js";
import { generateToken } from "../utils/generateToken.js";
// export const signup=async (req,res)=>{
//     try {
//         const {name,email,password}=req.body
//         const existingUser=await findUserByEmail(email);
//         if(existingUser){
//             return res.status(400).json({
//                 message:"User already Exists"
//             })
//         }
//     const hashedPassword=await bcrypt.hash(password,10)
//     const user=await createUser({name,email,password:hashedPassword,role:"user"})
//     res.status(201).json({
//         message:"Sign up Successfully"
//     })

//     } catch (error) {
//         res.status(500).json({
//             message:"Internal Server error"
//         })
//     }
// }

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                message: "User Already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({ name, email, password: hashedPassword, role: "user" })
        res.status(201).json({
            message: "User signup successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({
                message: "User Not Found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }
        const token = generateToken(user)
        res.status(200).json({
            message: "User logged In successfully",
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        console.log("REQ USER:", req.user);

        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Issues"
        })
    }
}