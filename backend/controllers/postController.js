const { fetchPosts, fetchComments } = require('../services/apiService');
async function getTrendingPosts(req, res) {
    try {
        const posts = await fetchPosts();
        const commentCounts = await Promise.all(posts.map(async (post) => {
            const comments = await fetchComments(post.id);
            return { ...post, commentCount: comments.length };
        }));
        const maxComments = Math.max(...commentCounts.map(p => p.commentCount));
        res.json(commentCounts.filter(p => p.commentCount === maxComments));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function getLatestPosts(req, res) {
    try {
        const posts = await fetchPosts();
        const latestPosts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
        res.json(latestPosts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = { getTrendingPosts, getLatestPosts };
