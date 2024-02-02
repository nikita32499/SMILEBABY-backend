import express from "express"
import * as CartControllers from "../controllers/carts/CartControllers.js"
import * as Validator from "../validations/carts-validations.js"
import {thisPublic,validateResult} from "../validations/validateResult.js"


const router = express.Router()


router.post(`/create`,thisPublic,Validator.Validator__create,validateResult,CartControllers.create)

router.post(`/update`,Validator.Validator__update,validateResult,CartControllers.update)

router.post(`/getById`,thisPublic,Validator.Validator__getById,validateResult,CartControllers.getById)

router.post(`/getAll`,Validator.Validator__getAll,validateResult,CartControllers.getAll)

router.post(`/remove`,Validator.Validator__remove,validateResult,CartControllers.remove)





export default router

