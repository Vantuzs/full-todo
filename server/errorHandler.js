module.exports.errorHandler = async (err,req,res,next) =>{
    return res.status(500).send(err.message)
}