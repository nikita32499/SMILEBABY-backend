import express from "express"
import cookieParser from "cookie-parser"
import items_router from "./items-router.js"
import sections_router from "./sections-router.js"
import loader_router from "./loader-router.js"
import carts_router from "./carts-router.js"
import users_router from "./users-router.js"
import orders_router from "./orders-router.js"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(`/api/smilebaby/public`,express.static('./public/'))




app.use(`/api/smilebaby/carts`,carts_router)
app.use(`/api/smilebaby/loader`,loader_router)
app.use(`/api/smilebaby/items`,items_router)
app.use(`/api/smilebaby/sections`,sections_router)
app.use(`/api/smilebaby/users`,users_router)
app.use(`/api/smilebaby/orders`,orders_router)





app.listen(global.config.server.port,()=>{
    console.log(`SERVER RUN ON ${global.config.server.port}`)
})







