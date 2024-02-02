import Database from "../Database.js"


class _Carts_{
    constructor(){
        Database.SetQuery(this)
    }




    create=async(data)=>{
        let current_time = Date.now()
        // return (await this.pool.query(`INSERT INTO carts(items,owner,create_time,last_time_activate)
        // VALUES(ARRAY[${data.items.map(item=>`CAST(ROW(${item.id},${item.count}) AS myrowtype)`).join(", ")}]::myrowtype[],'${data.owner}',${current_time},${current_time})
        // RETURNING *`)).rows?.[0]
        let result = (await this.pool.query(`INSERT INTO carts(items,owner,create_time,last_time_activate)
        VALUES('${JSON.stringify(data.items)}',
        '${data.owner}',
        ${current_time},
        ${current_time}) ON CONFLICT (owner) DO UPDATE SET 
        items=EXCLUDED.items,
        last_time_activate=EXCLUDED.last_time_activate
        RETURNING *`)).rows?.[0]

        return new this.CartsSchema(result)
    }


    getById=async({owner})=>{
        let cart_data = (await this.pool.query(`SELECT * FROM carts WHERE "owner"='${owner}'`)).rows?.[0]
        if(cart_data){
            return new this.CartsSchema(cart_data)
        }else{
            return null
        }
    }
    getAll=async()=>{
        let list = (await this.pool.query(`SELECT * FROM carts`)).rows
        
        return list.map(cart_data=>new this.CartsSchema(cart_data))
    }


    update=async({owner,data})=>{
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

        let list = (await this.pool.query(`UPDATE carts SET ${str_data} WHERE "owner"='${owner}' RETURNING *`)).rows
        return list.map(el=>new this.CartsSchema(el))   
    }

    
    remove=async({owner})=>{
        let result =  (await this.pool.query(`DELETE FROM carts WHERE "owner"='${owner}'
        RETURNING *`)).rows?.[0]

        return result?new this.CartsSchema(result):null
    }

    CartsSchema=class{
        constructor(cart_data){
            Object.assign(this,cart_data)
            this.create_time=Number(cart_data.create_time)
            this.last_time_activate=Number(cart_data.last_time_activate)
            this.items=JSON.parse(cart_data.items)
        }
    }
}



const Carts = new _Carts_()



export default Carts



// CREATE TYPE myrowtype AS (f1 int, f2 text, f3 numeric);
// CREATE TABLE mytable (ct myrowtype);
// INSERT INTO mytable(ct) VALUES (CAST(ROW(11,'this is a test',2.5) AS myrowtype));