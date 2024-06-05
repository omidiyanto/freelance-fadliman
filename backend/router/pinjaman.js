const express = require('express')
const pinjamanController = require('../controller/pinjamController')

const router = express.Router()

router.route('/').get(pinjamanController.getAllData).post(pinjamanController.createData)
router.route('/:id').get(pinjamanController.getOne).patch(pinjamanController.updateData).delete(pinjamanController.deleteData)

module.exports = router
