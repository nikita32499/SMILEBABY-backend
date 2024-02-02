class CustomError extends Error{
    constructor(message,data={}){
        super(message)
        Object.assign(this,data)
    }
}

class UserError extends Error{
    constructor(message){
        super(message)
        this.msg=message
    }
}


global.errors={
    CustomError,
    UserError
}