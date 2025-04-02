export default function TopUsers({ users, posts }) {
  // Calculate post count for each user
  const userPostCounts = {};
  posts.forEach(post => {
    const userId = post.userId;
    userPostCounts[userId] = (userPostCounts[userId] || 0) + 1;
  });

  // Convert to array and sort by post count
  const sortedUsers = Object.entries(userPostCounts)
    .map(([userId, postCount]) => {
      const userName = users[userId] || 'Unknown User';
      return { userId, userName, postCount };
    })
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5); // Get top 5

  return (
    <div className="bg-glass shadow-neomorph rounded-xl p-6">
      <h2 className="text-3xl font-bold text-white mb-6">🏆 Top Users by Post Count</h2>

      {sortedUsers.length === 0 ? (
        <p className="text-gray-300 text-center">No data available.</p>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full bg-transparent border-collapse">
            <thead>
              <tr className="text-gray-200 bg-gradient-to-r from-purple-700 to-blue-600 rounded-lg">
                <th className="px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Post Count</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr
                  key={user.userId}
                  className="hover:scale-105 transform transition-all duration-300 hover:shadow-lg bg-glassmorphic-card border border-white border-opacity-10"
                >
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold text-sm text-white shadow-md ${
                        index === 0
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                          : index === 1
                          ? 'bg-gradient-to-r from-gray-400 to-gray-600'
                          : 'bg-gradient-to-r from-orange-400 to-red-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-white">{user.userName}</td>
                  <td className="px-6 py-3 text-blue-300 font-semibold">{user.postCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
