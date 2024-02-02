import Database from "../Database.js"


class _Items_{
    constructor(){
        Database.SetQuery(this)
    }


    // create=async(data)=>{
    //     let result = (await this.pool.query(`INSERT INTO items(create_time,section_id,price,name,descriptions,season,
    //         country,color,quantity,img_main,img_prev,discount_amount,discount_type) 
    //     VALUES(
    //     ${Date.now()},
    //     ${data.section_id},
    //     ${data.price},
    //     '${data.name}',
    //     '${data.descriptions}',
    //     '${data.season}',
    //     '${data.country}',
    //     '${data.color}',
    //     ARRAY[${data.quantity.map(quantity=>`'${JSON.stringify(quantity)}'`).join(", ")}]::TEXT[],
    //     '${data.img_main}',
    //     ${data.img_prev.length>0?`ARRAY[${data.img_prev.map(img=>`'${img}'`).join(", ")}]::TEXT[]`:"ARRAY[]::TEXT[]"},
    //     ${data.discount_amount!=undefined?`'${data.discount_amount}'`:'NULL'},
    //     ${data.discount_type!=undefined?`'${data.discount_type}'`:"NULL"})
    //     RETURNING *`)).rows?.[0]

    //     return new this.ItemsSchema(result)
    // }
    // ARRAY[${data.quantity.map(quantity=>`'${JSON.stringify(quantity)}'`).join(", ")}]::TEXT[],
    create=async(data)=>{
        let result = (await this.pool.query(`INSERT INTO items(create_time,section_id,price,name,descriptions,season,
            country,img_main,img_prev,quantity) 
        VALUES(
        ${Date.now()},
        ${data.section_id},
        ${data.price},
        '${data.name}',
        '${data.descriptions}',
        '${data.season}',
        '${data.country}',
        '${data.img_main}',
        ${data.img_prev.length>0?`ARRAY[${data.img_prev.map(img=>`'${img}'`).join(", ")}]::TEXT[]`:"ARRAY[]::TEXT[]"},
        ${data.quantity?.length?`ARRAY[${data.quantity.map(img=>`'${JSON.stringify(img)}'`).join(", ")}]::TEXT[]`:"ARRAY[]::TEXT[]"}
        )
        RETURNING *`)).rows?.[0]

        return new this.ItemsSchema(result)
    }


    getById=async({id})=>{
        let item_data = (await this.pool.query(`SELECT items.*,(SELECT sections.name FROM sections WHERE sections.id=items.section_id) AS section FROM items WHERE "id"=${id}`)).rows?.[0]
        if(item_data){
            return new this.ItemsSchema(item_data)
        }else{
            return null
        }
    }
    getAll=async()=>{
        let list = (await this.pool.query(`SELECT items.*,(SELECT sections.name FROM sections WHERE sections.id=items.section_id) AS section FROM items`)).rows
        
        return list.map(item_data=>new this.ItemsSchema(item_data))
    }


    update=async({id,data})=>{
        let str_data = Object.entries(data).map(([key,value])=>{
            
            if(typeof value === "string"){
                value=`'${value}'`
            }else if(typeof value ==="boolean"){
                value=String(value).toUpperCase()
            }else if(Array.isArray(value)){
                value=`ARRAY[${value.map(el=>{
                    if(typeof el ==="object"){
                        return `'${JSON.stringify(el)}'`
                    }else{
                        return `'${el}'`
                    }
                }).join(", ")}]::TEXT[]`
            }else if(typeof value === "object"){
                value=`'${JSON.stringify(value)}'`
            }else if(typeof value === "number"){

            }else{
                throw new Error(`неизвестный тип при update\n${typeof value}\n${value}`)
            }
            return `"${key}"=${value}`
        }).join(", ")

        let list = (await this.pool.query(`UPDATE items SET ${str_data} WHERE "id"=${id} RETURNING *`)).rows
        return list.map(el=> new this.ItemsSchema(el))
    }
    remove=async({id})=>{
        let result = (await this.pool.query(`DELETE FROM items WHERE "id"=${id}
        RETURNING *`)).rows?.[0]
        return result?new this.ItemsSchema(result):null
    }

    ItemsSchema=class{
        constructor(item_data){
            Object.assign(this,item_data)
            this.create_time=Number(item_data.create_time)
            this.quantity=item_data.quantity.map(quantity=>JSON.parse(quantity))
            this.price=Math.max(0,Math.floor(item_data.price-item_data.discount))
            if(item_data.discount>0) this.first_price=Math.floor(item_data.price)
        }
    }
}



const Items = new _Items_()



export default Items