export default function TopUsers({ users, posts }) {
  // Calculate post count for each user
  const userPostCounts = {};
  posts.forEach(post => {
    const userId = post.userId;
    userPostCounts[userId] = (userPostCounts[userId] || 0) + 1;
  });

  // Convert to array and sort by post count
  const sortedUsers = Object.entries(userPostCounts)
    .map(([userId, postCount]) => ({
      userId,
      userName: users[userId] || 'Unknown User',
      postCount,
    }))
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5); // Get top 5

  return (
    <div className="bg-glass shadow-neomorph rounded-lg p-6 backdrop-blur-lg">
      <h2 className="text-2xl font-bold text-white text-center mb-4">🏆 Top Users</h2>
      
      <div className="overflow-hidden rounded-lg border border-white/20">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-white/10 text-lg">
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Posts</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr
                key={user.userId}
                className={`transition-all duration-300 ${
                  index === 0
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold scale-105'
                    : 'hover:bg-white/20'
                }`}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.userName}</td>
                <td className="px-6 py-4">{user.postCount}</td>
              </tr>
            ))}
            {sortedUsers.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
