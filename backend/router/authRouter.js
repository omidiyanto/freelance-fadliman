const express = require('express')
const authController = require('../controller/auth')

const authRouter = express.Router()

authRouter.post('/signup/client', authController.signup);
authRouter.post('/login/client', authController.login);

authRouter.post('/signup/admin',authController.signupAdmin)
authRouter.post('/login/admin',authController.loginAdmin)

module.exports = authRouter
