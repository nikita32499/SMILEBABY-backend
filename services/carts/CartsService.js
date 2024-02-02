import Carts from "../../models/carts/Carts.js"




class _CartsService_{
    constructor(){
        
        
    }
    create=async(data)=>{
        return await Carts.create(data)
    }
    update=async({owner,data})=>{
        return await Carts.update({owner,data})
    }
    getById=async({owner})=>{
        return await Carts.getById({owner})
    }
    getAll=async()=>{
        return await Carts.getAll()
    }
    remove=async({owner})=>{
        return await Carts.remove({owner})
    }
}



const CartsService=new _CartsService_()


export default CartsService