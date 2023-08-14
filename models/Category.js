const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Category', CategorySchema);
