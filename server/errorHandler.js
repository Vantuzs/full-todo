const {Error: {ValidationError,CastError}} = require('mongoose');
const NotFoundError = require('./errors/NotFound');
const {JsonWebTokenError, TokenExpiredError} = require('jsonwebtoken');

module.exports.errorHandler = async (err,req,res,next) =>{
    if(err instanceof ValidationError){
        return res.status(400).send({
            err: err.message
        })
    }

    if(err instanceof CastError){
        return res.status(400).send({err: 'Invalid id'})
    }

    if(err instanceof NotFoundError){
        return res.status(400).send({err: err.message})
    }

    if(err instanceof JsonWebTokenError || err instanceof TokenExpiredError){
        return res.status(403).send({err: 'Не Валидный ТОКЕН'})
    }
    console.log(err);
    return res.status(err.status ?? 500).send({err: 'Server error'})
}