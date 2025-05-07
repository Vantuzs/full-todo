const { User } = require("../models");

module.exports.registrationUser = async(req,res,next) =>{
    try {
        const {body} = req;
        const createUser = await User.create(body);
        if(!createUser){
            return res.status(404).send('User not found =(')
        }
        return res.status(201).send(createUser)
    } catch (error) {
        next(error)
    }
}

module.exports.loginUser = async(req,res,next) =>{
    try {
        
    } catch (error) {
        next(error)
    }
}