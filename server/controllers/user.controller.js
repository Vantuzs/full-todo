const NotFoundError = require("../errors/NotFound");
const { User } = require("../models");
const bcrypt = require('bcrypt');

module.exports.registrationUser = async(req,res,next) =>{
    try {
        const {body,passwordHash} = req;
        const createUser = await User.create({...body,passwordHash});
        if(!createUser){
            return res.status(404).send('User not found =(')
        }
        return res.status(201).send({data: createUser})
    } catch (error) {
        next(error)
    }
}

module.exports.loginUser = async(req,res,next) =>{
    try {
        // 1. Достать с тела http-запроса на логин: email, password
        const {body: {email,password}} = req;
        // 2. Проверить есть ли у нас пользователь с таким email
        const foundUser = await User.findOne({email});
        // 3. Если, у нас есть пользователь с таким имелом - мы проверяем пароль, правельный ли он
        // Если пароль не верный - выкидываем ошибку
        // Если пароль верный - логиним пользователя
        if(foundUser) {
            const result = await bcrypt.compare(password,foundUser.passwordHash);
            if(!result){
                throw new NotFoundError('Incorect password ');
            }
            return res.status(200).send({data: foundUser})
        } else{
            throw new NotFoundError('Incorect email');
        }
    } catch (error) {
        next(error)
    }
}