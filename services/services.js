import ItemsService from "./items/ItemsService.js"
import SectionsService from "./sections/SectionsService.js"
import CartsService from "./carts/CartsService.js"
import UsersService from "./users/UsersService.js"
import OrdersService from "./orders/OrdersService.js"
import TelegramService from "./telegram/TelegramService.js"

global.services={
    ItemsService,
    SectionsService,
    CartsService,
    UsersService,
    OrdersService,
    TelegramService
}