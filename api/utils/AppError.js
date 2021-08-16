module.exports = class AppError{
    constructor(status, message){
        this.status = status;
        this.message = message;
    }
}