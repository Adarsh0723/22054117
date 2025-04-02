const axios = require('axios');
async function fetchUsers() {
    const response = await axios.get('http://20.244.56.144/evaluation-service/users');
    return response.data.users;
}
async function fetchPosts() {
    const response = await axios.get('http://20.244.56.144/evaluation-service/posts');
    return response.data.posts;
}
async function fetchComments(postId) {
    const response = await axios.get(`http://20.244.56.144/evaluation-service/posts/${postId}/comments`);
    return response.data.comments;
}
module.exports = { fetchUsers, fetchPosts, fetchComments };