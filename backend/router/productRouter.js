const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();

router
  .route("/")
  .get(productController.getAllData)
  .post(productController.createData)

router.route('/:id').get(productController.getOne).patch(productController.updateData).delete(productController.deleteData)
module.exports = router
