import Items from "../../models/items/Items.js"




class _ItemsService_{
    constructor(){
        
        
    }
    create=async(data)=>{
        return await Items.create(data)
    }
    update=async({id,data})=>{
        return await Items.update({id,data})
    }
    getById=async({id})=>{
        return await Items.getById({id})
    }
    getAll=async()=>{
        return (await Items.getAll()).sort((a,b)=>b.id-a.id)
    }
    remove=async({id})=>{
        return await Items.remove({id})
    }
}



const ItemsService=new _ItemsService_()


export default ItemsService