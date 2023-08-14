const mongoose = require('mongoose');
const Video = mongoose.model('Video');
const Category = mongoose.model('Category');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).populate('categories', 'name');
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Fail', error: err });
  }
};

exports.postVideo = async (req, res) => {
  try {
    const categoryNames = req.body.categories;
    const categories = await Category.find({ name: { $in: categoryNames } });
    const categoryIds = categories.map((category) => category._id);

    const newVideoData = {
      ...req.body,
      categories: categoryIds,
    };

    const newVideo = new Video(newVideoData);
    await newVideo.save();
    res.json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const categoryNames = req.body.categories;

    let categoryIds = [];
    if (categoryNames && categoryNames.length) {
      const categories = await Category.find({ name: { $in: categoryNames } });
      categoryIds = categories.map((category) => category._id);
    }

    const updateData = categoryNames
      ? { ...req.body, categories: categoryIds }
      : req.body;

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('categories', 'name');
    res.json({ message: 'Success', video: updatedVideo });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndRemove(req.params.id);
    res.json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
};

exports.getViews = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.views += 1;
    await video.save();

    res.json({ message: 'Views incremented', views: video.views });
  } catch (err) {
    res.status(500).json({ message: 'Fail', error: err });
  }
};

exports.getVideosByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const videos = await Video.find({ categories: categoryId }).populate(
      'categories',
      'name'
    );

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Fail', error: err });
  }
};

exports.searchVideos = async (req, res) => {
  try {
    const searchQuery = req.query.search;

    const videos = await Video.find({
      $or: [
        { title: new RegExp(searchQuery, 'i') },
        { description: new RegExp(searchQuery, 'i') },
      ],
    });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Fail', error: err });
  }
};
