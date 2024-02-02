import express from "express"
import * as ItemControllers from "../controllers/items/ItemControllers.js"
import * as Validator from "../validations/items-validations.js"
import {thisPublic,validateResult} from "../validations/validateResult.js"


const router = express.Router()


router.post(`/create`,Validator.Validator__create,validateResult,ItemControllers.create)

router.post(`/update`,Validator.Validator__update,validateResult,ItemControllers.update)

router.post(`/getById`,thisPublic,Validator.Validator__getById,validateResult,ItemControllers.getById)

router.get(`/getAll`,thisPublic,Validator.Validator__getAll,validateResult,ItemControllers.getAll)

router.post(`/remove`,Validator.Validator__remove,validateResult,ItemControllers.remove)





export default router

