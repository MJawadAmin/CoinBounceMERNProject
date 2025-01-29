import pkg from 'joi'
const { ValidationError} =pkg
let errorHandler = (error , req , res , next )=>{
    let status = 500 ;
    console.log(error)
    let data ={
        messaege : 'external error', status
    }
    if (error instanceof  ValidationError){
        let status = 400 ;
        data.messaege= error.message;
          return res.status(status).json(data)
    }
    if (error.status){
        status = error.status
    }
    if (error.messaege){
        data.messaege= error.messaege
    }
    return res.status(status).json(data)
}

export default errorHandler;