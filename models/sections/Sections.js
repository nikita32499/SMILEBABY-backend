import Database from "../Database.js"


class _Sections_{
    constructor(){
        Database.SetQuery(this)
    }




    create=async(data)=>{
        return (await this.pool.query(`INSERT INTO sections(name,img) 
                                     VALUES('${data.name}','${data.img}')
                                     RETURNING *`)).rows?.[0]
    }


    getById=async({id})=>{
        let section_data = (await this.pool.query(`SELECT * FROM sections WHERE "id"=${id}`)).rows?.[0]
        if(section_data){
            return new this.SectionSchema(section_data)
        }else{
            return null
            // throw new Error(`не найден аккаунт id:${id}`)
        }
    }
    getAll=async()=>{
        let list = (await this.pool.query(`SELECT * FROM sections`)).rows
        
        return list.map(section_data=>new this.SectionSchema(section_data))
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

        return (await this.pool.query(`UPDATE sections SET ${str_data} WHERE "id"=${id} RETURNING *`)).rows
    }
    remove=async({id})=>{
        let result = (await this.pool.query(`DELETE FROM sections WHERE "id"=${id} RETURNING *`)).rows?.[0]

        return result?new this.SectionSchema(result):null
    }

    SectionSchema=class{
        constructor(section_data){
            Object.assign(this,section_data)
        }
    }
}



const Sections = new _Sections_()



export default Sections