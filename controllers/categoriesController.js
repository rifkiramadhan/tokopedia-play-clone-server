const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Fail', error: err });
  }
};

exports.postCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
};
