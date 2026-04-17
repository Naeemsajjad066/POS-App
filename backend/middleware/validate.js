// export const validate=(schema)=>(req,res,next)=>{
//     const result =schema.safeParse(req.body)

//     if(!result.success){
//         return res.status(400).json({
//             message:"Invalid data",
//             error:result.error.errors
//         })
//     }
//     req.body=result.data;
//     next()
// }

export const validate=(schema)=>(req,res,next)=>{
    const results=schema.safeParse(req.body)

    if(!results.success){
        return res.status(400).json({
            message:"Invalid data",
            error:results.error.errors
        })
    }
    req.body=results.data
    next()
}