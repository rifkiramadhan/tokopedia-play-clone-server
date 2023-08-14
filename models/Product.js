const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  linkProduct: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  videoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
});

mongoose.model('Product', ProductSchema);
