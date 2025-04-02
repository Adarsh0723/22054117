const express = require('express');
const { getTrendingPosts, getLatestPosts } = require('../controllers/postController');
const router = express.Router();
router.get('/', (req, res) => {
    if (req.query.type === 'popular') getTrendingPosts(req, res);
    else if (req.query.type === 'latest') getLatestPosts(req, res);
    else res.status(400).json({ message: 'Invalid type' });
});
module.exports = router;