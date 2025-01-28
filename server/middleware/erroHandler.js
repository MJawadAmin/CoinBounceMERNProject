import pkg from 'joi'
const { ValidationError} =pkg
let errorHandler = (err , req , res , next )=>{
    let status = 500 ;
    let data ={
        messaege : 'external error', status
    }
    if (err instanceof  ValidationError){
        let status = 400 ;
        data.messaege= err.message;
          return res.status(status).json(data)
    }
    if (err.status){
        status = err.status
    }
    if (err.messaege){
        data.messaege= err.messaege
    }
    return res.status(status).json(data)
}

export default errorHandler;