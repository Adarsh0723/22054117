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
    <div className="bg-[#1a1c2d]/80 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#2a2d3e] max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="mr-3 bg-gradient-to-r from-[#FF512F] to-[#F09819] w-10 h-10 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(255,81,47,0.4)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Top Users</h2>
      </div>

      {sortedUsers.length === 0 ? (
        <div className="bg-[#242738] rounded-xl p-8 text-center border border-[#2a2d3e]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-gray-400">No data available.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#2a2d3e]">
          <div className="grid grid-cols-12 bg-[#242738] py-3 px-4 text-gray-300 text-sm font-medium">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-7">User</div>
            <div className="col-span-3 text-center">Posts</div>
          </div>
          
          <div className="divide-y divide-[#2a2d3e]">
            {sortedUsers.map((user, index) => (
              <div
                key={user.userId}
                className="grid grid-cols-12 items-center py-4 px-4 bg-[#242738] hover:bg-[#2a2d3e] transition-colors duration-200"
              >
                <div className="col-span-2 flex justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md
                    ${index === 0 
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' 
                      : index === 1 
                        ? 'bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9]' 
                        : index === 2 
                          ? 'bg-gradient-to-r from-[#CD7F32] to-[#A0522D]'
                          : 'bg-[#3a3d4e]'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="col-span-7 text-white flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4776E6] to-[#8E54E9] flex items-center justify-center text-sm font-bold text-white mr-3 shadow-[0_2px_8px_rgba(78,119,230,0.4)]">
                    {user.userName.charAt(0)}
                  </div>
                  {user.userName}
                </div>
                <div className="col-span-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#4776E6]/20 text-[#4776E6]">
                    {user.postCount} posts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
