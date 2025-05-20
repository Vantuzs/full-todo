const {Error: {ValidationError,CastError}} = require('mongoose');
const NotFoundError = require('./errors/NotFound');
const {JsonWebTokenError, TokenExpiredError} = require('jsonwebtoken');
const RefreshTokenError = require('./errors/RefreshTokenError');

module.exports.errorHandler = async (err,req,res,next) =>{
    if(err instanceof ValidationError){
        return res.status(400).send({
            error: err.message
        })
    }

    if(err instanceof CastError){
        return res.status(400).send({error: 'Invalid id'})
    }

    if(err instanceof NotFoundError){
        return res.status(400).send({error: err.message})
    }

    if(err instanceof JsonWebTokenError || err instanceof TokenExpiredError){
        return res.status(403).send({error: 'Не Валидный ТОКЕН'})
    }

    if(err instanceof RefreshTokenError){
        return res.status(401).send({error: err.message})
    }
    console.log(err);
    return res.status(err.status ?? 500).send({error: err.message})
}