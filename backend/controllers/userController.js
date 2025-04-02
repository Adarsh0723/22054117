const { fetchUsers } = require('../services/apiService');
async function getTopUsers(req, res) {
    try {
        const users = await fetchUsers();
        const sortedUsers = users.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        res.json(sortedUsers);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = { getTopUsers };