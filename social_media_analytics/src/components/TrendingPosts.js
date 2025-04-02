export default function TrendingPosts({ posts }) {
    // Sort posts by comment count
    const trendingPosts = [...posts]
      .sort((a, b) => b.commentCount - a.commentCount)
      .slice(0, 5); // Get top 5
  
    return (
      <div className="bg-glass shadow-neomorph rounded-xl p-6">
        <h2 className="text-3xl font-bold text-white mb-4">🔥 Trending Posts</h2>
        
        {trendingPosts.length === 0 ? (
          <p className="text-gray-300 text-center">No trending posts found.</p>
        ) : (
          <div className="space-y-6">
            {trendingPosts.map((post, index) => (
              <div
                key={post.id}
                className="glassmorphic-card border border-white border-opacity-10 rounded-lg p-5 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xl text-white">{post.userName}</h3>
                    <p className="mt-2 text-gray-200">{post.content}</p>
                  </div>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {post.commentCount} Comments
                  </span>
                </div>
  
                {post.comments.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-400 border-opacity-30">
                    <p className="text-sm text-gray-300 mb-1">✨ Top Comment:</p>
                    <p className="text-sm text-gray-100 italic">{post.comments[0].content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  