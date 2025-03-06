var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/categories');

// GET: Lấy danh sách categories
router.get('/', async function(req, res) {
  let categories = await categoryModel.find({});
  res.status(200).send({ success: true, data: categories });
});

// POST: Thêm category mới
router.post('/', async function(req, res) {
  try {
    let newCategory = new categoryModel({
      name: req.body.name,
      description: req.body.description
    });
    await newCategory.save();
    res.status(200).send({ success: true, data: newCategory });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// PUT: Cập nhật category
router.put('/:id', async function(req, res) {
  try {
    let updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) throw new Error("Không tìm thấy category");
    res.status(200).send({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// DELETE: Xóa category
router.delete('/:id', async function(req, res) {
  try {
    let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) throw new Error("Không tìm thấy category");
    res.status(200).send({ success: true, message: "Đã xóa category" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;
