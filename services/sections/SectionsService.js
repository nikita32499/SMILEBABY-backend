import Sections from "../../models/sections/Sections.js"




class _SectionsService_{
    constructor(){
        
    }
    create=async(data)=>{
        return await Sections.create(data)
    }
    update=async({id,data})=>{
        return await Sections.update({id,data})
    }
    getById=async({id})=>{
        return await Sections.getById({id})
    }
    getAll=async()=>{
        return (await Sections.getAll()).sort((a,b)=>b.id-a.id)
    }
    remove=async({id})=>{
        return await Sections.remove({id})
    }
}



const SectionsService=new _SectionsService_()


export default SectionsService