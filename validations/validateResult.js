import { validationResult } from "express-validator";

const DeniedRequest=(req,res)=>{
    res.status(401).json({error:"Отказано в доступе"})
}


export function validateResult(req,res,next){
    const errors = validationResult(req)



    if(!req.this_public && req.cookies.authorization!==global.config.authorization_token){
        if(!req.cookies.authorization){
            return DeniedRequest(req,res)
        }
        let user_data = global.services.UsersService.validateToken({token:req.cookies.authorization})
        if(!user_data || user_data.role!=='admin'){
            return DeniedRequest(req,res)
        }
    }
    


    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
    
}

export function thisPublic(req,res,next){
    req.this_public=true
    next()
    
}