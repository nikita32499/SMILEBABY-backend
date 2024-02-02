



export async function create(req,res){
    try {

        let order = await global.services.OrdersService.create(req.body)

        let item_list = await global.services.ItemsService.getAll()

        if(typeof order==="object"){
            await global.services.TelegramService.SendMessage({
                message:`Создан заказ ID:<b>${order.id}</b>
                Телефон:<b>${order.phone}</b>
                Имя: <b>${order.name}</b>
                Email: <b>${order.email || "Не указан"}</b>
                
                Товары:\n
                ${order.items.map(cart_item=>{
                    let item = item_list.find(item=>item.id===cart_item.item_id)
                    if(!item) return `Ошибка товара: Не найден ID - ${cart_item.item_id}\n`
                    return `ID:<b>${item.id}</b>\nНазвание:<b>${item.name}</b>\nРазмер:<b>${cart_item.size}</b>\nКол-во: <b>${cart_item.count} шт</b>\n\n`
                }).filter(str=>str).join("")}`.replace(/\ {2,}/g," ")
            })
        }

        res.json({result:order})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function update(req,res){
    try {

        let result = await global.services.OrdersService.update(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function getById(req,res){
    try {

        let result = await global.services.OrdersService.getById(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}
export async function getAll(req,res){
    try {

        let result = await global.services.OrdersService.getAll(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}

export async function remove(req,res){
    try {

        let result = await global.services.OrdersService.remove(req.body)
        res.json({result})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:error.msg || "Внутреняя ошибка"})
    }
}