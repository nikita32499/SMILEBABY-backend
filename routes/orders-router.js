import express from "express"
import * as OrderControllers from "../controllers/orders/OrderControllers.js"
import * as Validator from "../validations/orders-validations.js"
import {thisPublic,validateResult} from "../validations/validateResult.js"


const router = express.Router()


router.post(`/create`,thisPublic,Validator.Validator__create,validateResult,OrderControllers.create)

router.post(`/update`,Validator.Validator__update,validateResult,OrderControllers.update)

router.get(`/getById`,Validator.Validator__getById,validateResult,OrderControllers.getById)

router.get(`/getAll`,Validator.Validator__getAll,validateResult,OrderControllers.getAll)

router.post(`/remove`,Validator.Validator__remove,validateResult,OrderControllers.remove)





export default router

