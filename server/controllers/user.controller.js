const NotFoundError = require("../errors/NotFound");
const { User, RefreshToken } = require("../models");
const bcrypt = require('bcrypt');
const RefreshTokenError = require('../errors/RefreshTokenError');
const {createAccessToken,verifyAccessToken, createRefreshToken,verifyRefreshToken} = require('../services/createSession')

module.exports.registrationUser = async(req,res,next) =>{
    try {
        const {body,passwordHash} = req;
        const createUser = await User.create({...body,passwordHash});
        if(!createUser){
            return res.status(404).send('User not found =(')
        }

        const token = await createAccessToken({userId: createUser._id,email: createUser.email})

        return res.status(201).send({data: createUser,tokens: {token}})
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

            const accessToken = await createAccessToken({userId: foundUser._id,email: foundUser.email})
            const refreshToken = await createRefreshToken({userId: foundUser._id,email: foundUser.email})
            
            await RefreshToken.create({token: refreshToken,userId: foundUser._id});
            return res.status(200).send({data: foundUser,tokens: {accessToken,refreshToken}})
        } else{
            throw new NotFoundError('Incorect email');
        }
    } catch (error) {
        next(error)
    }
}

////////// Auth

module.exports.checkAuth = async(req,res,next) =>{
    try {
        const {tokenPayload: {userId}} = req;

        const foundUser = await User.findOne({
            _id: userId
        });

        return res.status(200).send({data: foundUser})
    } catch (error) {
        next(error)
    }
}

module.exports.refreshSession = async (req,res,next) =>{
    const { body: {refreshToken} } = req;
    
    
    let verufyResult;
    try { // Проверяем валидный ли refresh token
        verufyResult = await verifyRefreshToken(refreshToken);
    } catch (error) {
        const newError = new RefreshTokenError('Invalid refresh token -> Idi Na Hu I')
        return next(newError)
    }
    try { // Выполняем логику обновлния сессии
        
    /* 
    
    Access token
    Живёт мало, многоразовый. Именно этим токеном мы и будет сопровождать все наши запросы.

    Refresh token
    Живет долго, одноразовый. Предназначен для обновления пары токенов.

    Приходит запрос с AT
     - АТ валидный, выполняем запрос
     - AT невалидный
        1. Отвечаем определённым кодом ошибки
        2. В ответ на эту ошибку, фронт отправляет РТ
            - Если РТ валидный - рефрешим сесисю, выдаём новую пару токенов
            - Если РТ невалидный - перенаправляем пользователя на аутенфикацию
    
    */       
    
    if(verufyResult){
        const user = await User.findOne({_id: verufyResult.userId});
        const oldRefreshTokenFromDB = await RefreshToken.findOne({$and: [{token: refreshToken},{userId: user._id}]});

        if(oldRefreshTokenFromDB){
            await RefreshToken.deleteOne({$and: [{token: refreshToken},{userId: user._id}]})
            
            const newAccessToken = await createAccessToken({userId: user._id,email: user.email});
            const newRefreshToken = await createRefreshToken({userId: user._id,email: user.email});

            await RefreshToken.create({token: newRefreshToken,userId: user._id});
            return res.status(200).send({tokens: {accessToken: newAccessToken,refreshToken: newRefreshToken}});
        } 
    } else{
        return res.status(401).send({error: 'IDI NAHUI'})
    }

    } catch (error) {
        next(error)
    }
}