import { body } from "express-validator";





export const Validator__create=[
    body("items").isArray(),
    body("owner").isString(),
]

export const Validator__update=[
    body("owner").isString()
]
export const Validator__getAll=[
   
]
export const Validator__getById=[
    body("owner").isString()
]
export const Validator__remove=[
    body("owner").isString()
]


