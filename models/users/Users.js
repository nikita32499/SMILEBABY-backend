import Database from "../Database.js"


class _Users_{
    constructor(){
        Database.SetQuery(this)
    }

    GetJwtToken=({account})=>{
        const token = jwt.sign({
            login:account.login,
            account_number:account.account_number
        },global.config.jwt_secretKey,{expiresIn:"1d",algorithm: 'HS512'})
        return token
    }


    create=async({login,password_hash})=>{
        let current_time = Date.now()
        // return (await this.pool.query(`INSERT INTO carts(items,owner,create_time,last_time_activate)
        // VALUES(ARRAY[${data.items.map(item=>`CAST(ROW(${item.id},${item.count}) AS myrowtype)`).join(", ")}]::myrowtype[],'${data.owner}',${current_time},${current_time})
        // RETURNING *`)).rows?.[0]
        let result = (await this.pool.query(`INSERT INTO users(login,password_hash,create_time,last_time_activate)
        VALUES('${login}',
        '${password_hash}',
        ${current_time},
        ${current_time})
        RETURNING *`)).rows?.[0]

        return new this.UsersSchema(result)
    }
    


    getById=async({id})=>{
        let user_data = (await this.pool.query(`SELECT * FROM users WHERE "id"=${id}`)).rows?.[0]
        if(user_data){
            return new this.UsersSchema(user_data)
        }else{
            return null
        }
    }
    getByLogin=async({login,save_password_hash=false})=>{
        let user_data = (await this.pool.query(`SELECT * FROM users WHERE "login"='${login}'`)).rows?.[0]
        
        if(user_data){
            return new this.UsersSchema(user_data,{save_password_hash})
        }else{
            return null
        }
    }
    getAll=async()=>{
        let list = (await this.pool.query(`SELECT * FROM users`)).rows
        
        return list.map(user_data=>new this.UsersSchema(user_data))
    }


    update=async({id,data})=>{
        let str_data = Object.entries(data).map(([key,value])=>{
            
            if(typeof value === "string"){
                value=`'${value}'`
            }else if(typeof boolean ==="boolean"){
                value=String(value).toUpperCase()
            }else if(typeof value === "object"){
                value=`'${JSON.stringify(value)}'`
            }else if(typeof value === "number"){

            }else{
                throw new Error(`неизвестный тип при update\n${typeof value}\n${value}`)
            }
            return `"${key}"=${value}`
        }).join(", ")

        let list = (await this.pool.query(`UPDATE users SET ${str_data} WHERE "id"=${id} RETURNING *`)).rows
        return list.map(el=>new this.UsersSchema(el))   
    }

    
    remove=async({id})=>{
        let result =  (await this.pool.query(`DELETE FROM users WHERE "id"=${id}
        RETURNING *`)).rows?.[0]
        
        return result?new this.UsersSchema(result):null
    }

    UsersSchema=class{
        constructor(user_data,options={}){
            Object.assign(this,user_data)
            this.create_time=Number(user_data.create_time)
            this.last_time_activate=Number(user_data.last_time_activate)
            if(!options.save_password_hash){
                delete this.password_hash
            }
            
        }
    }
}



const Users = new _Users_()



export default Users



// CREATE TYPE myrowtype AS (f1 int, f2 text, f3 numeric);
// CREATE TABLE mytable (ct myrowtype);
// INSERT INTO mytable(ct) VALUES (CAST(ROW(11,'this is a test',2.5) AS myrowtype));

// GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO "smilebaby";