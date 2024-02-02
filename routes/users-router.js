import express from "express"
import * as UserControllers from "../controllers/users/UserControllers.js"
import * as Validator from "../validations/users-validations.js"
import {thisPublic,validateResult} from "../validations/validateResult.js"


const router = express.Router()


router.post(`/create`,Validator.Validator__create,validateResult,UserControllers.create)

router.post(`/login`,thisPublic,Validator.Validator__create,validateResult,UserControllers.login)

router.post(`/validateToken`,thisPublic,Validator.Validator__validateToken,validateResult,UserControllers.validateToken)

router.post(`/update`,Validator.Validator__update,validateResult,UserControllers.update)

router.post(`/getById`,Validator.Validator__getById,validateResult,UserControllers.getById)

router.post(`/getByLogin`,Validator.Validator__getByLogin,validateResult,UserControllers.getByLogin)

router.post(`/getAll`,Validator.Validator__getAll,validateResult,UserControllers.getAll)

router.post(`/remove`,Validator.Validator__remove,validateResult,UserControllers.remove)





export default router

