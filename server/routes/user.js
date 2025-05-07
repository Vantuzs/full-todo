const Router = require('express');
const UserController = require('../controllers/user.controller');

const userRouter = Router();

// POST http://localhost:5000/api/users/registration
userRouter.post('/registration',UserController.registrationUser);
userRouter.post('/login',UserController.loginUser)

module.exports = userRouter;