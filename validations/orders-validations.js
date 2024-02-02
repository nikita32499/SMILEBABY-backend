import { body } from "express-validator";





export const Validator__create=[
    body("items").isArray(),
    body("phone").isString(),
    body("name").isString(),
    body("email").optional().isString(),
]

export const Validator__update=[
    body("id").isInt()
]
export const Validator__getAll=[
   
]
export const Validator__getById=[
    body("id").isInt()
]
export const Validator__remove=[
    body("id").isInt()
]


