const Router = require('express');
const UserController = require('../controllers/user.controller');
const { hashPass } = require('../middlewares/hashPassword');
const { checkToken } = require('../middlewares/checkToken');

const userRouter = Router();

// POST http://localhost:5000/api/users/sign-up
userRouter.post('/sign-up',hashPass,UserController.registrationUser);
userRouter.post('/sign-in',UserController.loginUser);
// GET http://localhost:5000/api/users/
userRouter.get('/',checkToken,UserController.checkAuth);

module.exports = userRouter;