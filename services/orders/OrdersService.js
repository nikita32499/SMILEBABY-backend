import Orders from "../../models/orders/Orders.js"




class _OrdersService_{
    constructor(){
        
        
    }
    create=async(data)=>{
        return await Orders.create(data)
    }
    update=async({id,data})=>{
        return await Orders.update({id,data})
    }
    getById=async({id})=>{
        return await Orders.getById({id})
    }
    getAll=async()=>{
        return await Orders.getAll()
    }
    remove=async({id})=>{
        return await Orders.remove({id})
    }
}



const OrdersService=new _OrdersService_()


export default OrdersService