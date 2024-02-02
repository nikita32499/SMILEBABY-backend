import express from "express"
import * as SectionControllers from "../controllers/sections/SectionControllers.js"
import * as Validator from "../validations/sections-validations.js"
import {thisPublic,validateResult} from "../validations/validateResult.js"


const router = express.Router()


router.post(`/create`,Validator.Validator__create,validateResult,SectionControllers.create)

router.post(`/update`,Validator.Validator__update,validateResult,SectionControllers.update)

router.post(`/getById`,thisPublic,Validator.Validator__getById,validateResult,SectionControllers.getById)

router.get(`/getAll`,thisPublic,Validator.Validator__getAll,validateResult,SectionControllers.getAll)

router.post(`/remove`,Validator.Validator__remove,validateResult,SectionControllers.remove)





export default router

