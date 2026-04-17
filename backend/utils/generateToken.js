import jwt from 'jsonwebtoken'

export const generateToken=(user)=>{
    return jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET || "SECRET_KEY",
        {
            expiresIn:"1h"
        }
    )
}