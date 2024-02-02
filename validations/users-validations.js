import { body } from "express-validator";





export const Validator__create=[
    body("login").isString(),
    body("password").isString(),
]
export const Validator__validateToken=[
    // body("token").isString()
]
export const Validator__update=[
    body("id").isInt()
]
export const Validator__getAll=[
   
]
export const Validator__getById=[
    body("id").isInt()
]
export const Validator__getByLogin=[
    body("login").isString()
]
export const Validator__remove=[
    body("id").isInt()
]


