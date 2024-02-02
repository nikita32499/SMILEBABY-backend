



export async function create(req,res){
    try {

        let result = await global.services.ItemsService.create(req.body)

        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function update(req,res){
    try {

        let result = await global.services.ItemsService.update(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function getById(req,res){
    try {

        let result = await global.services.ItemsService.getById(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function getAll(req,res){
    try {

        let result = await global.services.ItemsService.getAll()
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}

export async function remove(req,res){
    try {

        let result = await global.services.ItemsService.remove(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}