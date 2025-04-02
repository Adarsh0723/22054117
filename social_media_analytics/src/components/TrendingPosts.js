export default function TrendingPosts({ posts }) {
    // Sort posts by comment count
    const trendingPosts = [...posts]
      .sort((a, b) => b.commentCount - a.commentCount)
      .slice(0, 5); // Get top 5
  
    return (
      <div className="bg-[#1a1c2d]/80 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#2a2d3e] max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="mr-3 bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] w-10 h-10 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(252,70,107,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Trending Posts</h2>
        </div>
        
        {trendingPosts.length === 0 ? (
          <div className="bg-[#242738] rounded-xl p-8 text-center border border-[#2a2d3e]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-400">No trending posts found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trendingPosts.map((post, index) => (
              <div
                key={post.id}
                className="bg-[#242738] rounded-lg p-5 border border-[#2a2d3e] hover:border-[#3a3d4e] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4776E6] to-[#8E54E9] flex items-center justify-center text-sm font-bold text-white shadow-[0_4px_10px_rgba(78,119,230,0.4)]">
                      {post.userName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{post.userName}</h3>
                      <p className="mt-2 text-gray-300 text-sm">{post.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-[#3a3d4e] px-2 py-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FC466B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-300">{post.commentCount}</span>
                  </div>
                </div>
  
                {post.comments.length > 0 && (
                  <div className="mt-4 ml-13 pl-4 border-l-2 border-[#FC466B]/30">
                    <p className="text-xs text-gray-400 mb-1">Top Comment</p>
                    <p className="text-sm text-gray-300">{post.comments[0].content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  