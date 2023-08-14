const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');

router.get('/', videosController.getAllVideos);
router.post('/', videosController.postVideo);
router.put('/:id', videosController.updateVideo);
router.delete('/:id', videosController.deleteVideo);
router.get('/:id/views', videosController.getViews);
router.get('/search', videosController.searchVideos);
router.get('/category/:categoryId', videosController.getVideosByCategory);

module.exports = router;
