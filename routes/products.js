var express = require('express');
var router = express.Router();
let productModel = require('../schemas/products');

// GET: Lấy danh sách sản phẩm
router.get('/', async function(req, res) {
  let products = await productModel.find({ deleted: false });
  res.status(200).send({ success: true, data: products });
});

// POST: Thêm sản phẩm mới
router.post('/', async function(req, res) {
  try {
    let newProduct = new productModel({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category
    });
    await newProduct.save();
    res.status(200).send({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// PUT: Cập nhật sản phẩm
router.put('/:id', async function(req, res) {
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) throw new Error("Không tìm thấy sản phẩm");
    res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// DELETE: Xóa mềm sản phẩm
router.delete('/:id', async function(req, res) {
  try {
    let deletedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!deletedProduct) throw new Error("Không tìm thấy sản phẩm");
    res.status(200).send({ success: true, message: "Đã xóa mềm sản phẩm" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;
