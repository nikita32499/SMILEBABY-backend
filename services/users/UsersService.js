import Users from "../../models/users/Users.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';



class _UsersService_{
    constructor(){
        
        
    }
    // create=async({login,password})=>{

    //     return await Users.create({})
    // }

    GetJwtToken=({user})=>{
        const token = jwt.sign({
            login:user.login,
            id:user.id,
            role:user.role || "client"
        },global.config.jwt_secretKey,{expiresIn:"7d",algorithm: 'HS512'})
        return token
    }
    validateToken=({token})=>{
        try {
            const decoded = jwt.verify(token, global.config.jwt_secretKey);
            return decoded;
        } catch (error) {
            return null;
        }
    }


    create=async({login,password})=>{
        

        let user = await Users.getByLogin({login})
        if(user){
            throw new global.errors.UserError("Этот логин уже занят")
        }

        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        const password_hash = await bcrypt.hash(password, salt);
        

        user = await Users.create({login,password_hash})
    

        let token = this.GetJwtToken({user})

        return {
            login,
            token
        }
    }

    login=async({login,password})=>{
        let user = await Users.getByLogin({login,save_password_hash:true})
        if(!user || !(await bcrypt.compare(password, user.password_hash))){
            throw new global.errors.UserError("Не правильный логин или пароль")
        }
        delete user.password_hash
        let token = this.GetJwtToken({user})
        
        return token

    }

    



    update=async({id,data})=>{
        return await Users.update({id,data})
    }
    getById=async({id})=>{
        return await Users.getById({id})
    }
    getAll=async()=>{
        return await Users.getAll()
    }
    getByLogin=async({login})=>{
        return await Users.getByLogin({login})
    }
    remove=async({id})=>{
        return await Users.remove({id})
    }
}



const UsersService=new _UsersService_()


export default UsersService