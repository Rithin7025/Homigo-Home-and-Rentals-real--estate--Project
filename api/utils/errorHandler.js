export const errorHandler = (statuscode, message)=> {

    console.log('entered the errohandler',statuscode,message)
    const error = new Error();
    error.statuscode = statuscode;
    error.message = message;
    return error;
}