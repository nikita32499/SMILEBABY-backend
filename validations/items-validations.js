import { body } from "express-validator";





export const Validator__create=[
    body("section_id").isInt(),
    body("price").isFloat(),
    body("name").isString(),
    body("descriptions").isString(),
    body("season").isString(),
    body("country").isString(),
    body("img_main").isString(),
    body("img_prev").optional().isArray()
]

export const Validator__update=[
    body("id").isInt(),
]
export const Validator__getAll=[
   
]
export const Validator__getById=[
    body("id").isInt()
]
export const Validator__remove=[
    body("id").isInt()
]


