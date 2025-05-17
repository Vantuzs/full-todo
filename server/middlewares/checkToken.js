const RefreshTokenError = require('../errors/RefreshTokenError');
const {verifyAccessToken} = require('../services/createSession')

module.exports.checkToken = async(req,res,next) =>{
    try {
        const {headers: {authorization}} = req;
        if(!authorization){
            throw new RefreshTokenError('Need authenfication');
        }
        const [,token] = authorization.split(' ')
        const payload = await verifyAccessToken(token);

        req.tokenPayload = payload;

        next()
    } catch (error) {
        next(error)
    }
}