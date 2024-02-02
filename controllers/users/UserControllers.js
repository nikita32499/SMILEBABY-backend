



export async function create(req,res){
    try {

        let result = await global.services.UsersService.create(req.body)

        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function login(req,res){
    try {

        let token = await global.services.UsersService.login(req.body)

        res.cookie("authorization",token,{
            maxAge:1000*60*60*24*7,
            path:"/",
            secure:true
        }).json({result:token})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}

export async function validateToken(req,res){
    try {

        let result =    await global.services.UsersService.validateToken(req.body)

        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}


export async function update(req,res){
    try {

        let result = await global.services.UsersService.update(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function getById(req,res){
    try {

        let result = await global.services.UsersService.getById(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function getByLogin(req,res){
    try {

        let result = await global.services.UsersService.getByLogin(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function getAll(req,res){
    try {

        let result = await global.services.UsersService.getAll(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}

export async function remove(req,res){
    try {

        let result = await global.services.UsersService.remove(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}