
//created a common class for center eror handling
class CustomError extends Error{
    constructor(message,code){
        super(message);
        this.code = code
    }
}

module.exports = CustomError