



export async function create(req,res){
    try {

        let result = await global.services.SectionsService.create(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function update(req,res){
    try {

        let result = await global.services.SectionsService.update(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function getById(req,res){
    try {

        let result = await global.services.SectionsService.getById(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function getAll(req,res){
    try {

        let result = await global.services.SectionsService.getAll(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}

export async function remove(req,res){
    try {

        let result = await global.services.SectionsService.remove(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}