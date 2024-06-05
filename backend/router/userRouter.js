const express = require("express");
const userController = require("../controller/userController");
const authController = require('../controller/auth.js')
const router = express.Router();

router.route('/').get(userController.getAllUser).post(authController.signup)
router.route('/:id').get(userController.getOne).patch(userController.updateData).delete(userController.deleteData)


module.exports = router
