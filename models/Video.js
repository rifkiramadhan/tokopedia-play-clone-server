const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
  urlImage: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  views: { type: Number, default: 0 },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Video', VideoSchema);
