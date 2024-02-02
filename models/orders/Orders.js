import Database from "../Database.js"


class _Orders_{
    constructor(){
        Database.SetQuery(this)
    }




    create=async(data)=>{
        let result = (await this.pool.query(`INSERT INTO orders(create_time,items,phone,name,email) 
        VALUES(${Date.now()},
        '${JSON.stringify(data.items)}',
        '${data.phone}',
        '${data.name}',
        ${data.email?`'${data.email}'`:'NULL'})
        RETURNING *`)).rows?.[0]

        return new this.OrderSchema(result)
    }


    getById=async({id})=>{
        let order_data = (await this.pool.query(`SELECT * FROM orders WHERE "id"=${id}`)).rows?.[0]
        if(order_data){
            return new this.OrderSchema(order_data)
        }else{
            return null
        }
    }
    getAll=async()=>{
        let list = (await this.pool.query(`SELECT * FROM orders`)).rows
        
        return list.map(order_data=>new this.OrderSchema(order_data)).sort((a,b)=>b.id-a.id)
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

        let list = (await this.pool.query(`UPDATE orders SET ${str_data} WHERE "id"=${id} RETURNING *`)).rows
        return list.map(el=> new this.OrderSchema(el))
    }
    remove=async({id})=>{
        let result = (await this.pool.query(`DELETE FROM orders WHERE "id"=${id}
        RETURNING *`)).rows?.[0]
        return result?new this.OrderSchema(result):null
    }

    OrderSchema=class{
        constructor(order_data){
            Object.assign(this,order_data)
            this.create_time=Number(order_data.create_time)
            this.items=JSON.parse(order_data.items)
        }
    }
}



const Orders = new _Orders_()



export default Orders