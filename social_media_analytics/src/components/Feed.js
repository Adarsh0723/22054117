import { useState, useEffect } from 'react';
import '@/app/globals.css';

export default function Feed({ posts }) {
  const [feedPosts, setFeedPosts] = useState([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    setFeedPosts([...posts].sort((a, b) => b.id - a.id));
    let interval;
    if (isLive && posts.length > 0) {
      interval = setInterval(() => {
        setFeedPosts(prevPosts => {
          const randomIndex = Math.floor(Math.random() * prevPosts.length);
          const newPosts = [...prevPosts];
          const post = newPosts.splice(randomIndex, 1)[0];
          return [{ ...post, id: Date.now(), highlight: true }, ...newPosts];
        });
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [posts, isLive]);

  return (
    <div className="bg-glass rounded-2xl p-6 shadow-neomorph w-full max-w-3xl mx-auto">
      {/* Live Feed Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">🔥 Live Feed</h2>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-6 py-2 rounded-full font-semibold text-white transition-all shadow-lg ${
            isLive ? 'bg-gradient-to-r from-green-400 to-green-600 hover:scale-105' : 'bg-gradient-to-r from-gray-500 to-gray-700 hover:scale-105'
          }`}
        >
          {isLive ? 'Live' : 'Paused'}
        </button>
      </div>

      {/* Feed Posts */}
      <div className="space-y-6">
        {feedPosts.map(post => (
          <div 
            key={post.id} 
            className={`glassmorphic-card p-6 rounded-xl transition-transform transform hover:scale-105 ${
              post.highlight ? 'highlight' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* User Avatar */}
              <div className="neo-avatar w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">
                {post.userName ? post.userName.charAt(0) : 'U'}
              </div>

              {/* Post Content */}
              <div className="flex-1 text-white">
                <h3 className="font-semibold text-lg">{post.userName}</h3>
                <p className="mt-2 text-sm opacity-80">{post.content}</p>

                {/* Comments Section */}
                {post.comments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm opacity-60">
                      {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                    </p>
                    <div className="pl-4 border-l-4 border-gradient opacity-80">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="py-1">
                          <p className="text-sm text-gray-200">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* No Posts Message */}
        {feedPosts.length === 0 && (
          <p className="text-gray-300 text-center py-4">No posts available.</p>
        )}
      </div>
    </div>
  );
}
