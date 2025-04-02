"use client"

import { useState, useEffect } from "react"

export default function Feed({ posts }) {
  const [feedPosts, setFeedPosts] = useState([])
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    setFeedPosts([...posts].sort((a, b) => b.id - a.id))
    let interval
    if (isLive && posts.length > 0) {
      interval = setInterval(() => {
        setFeedPosts((prevPosts) => {
          const randomIndex = Math.floor(Math.random() * prevPosts.length)
          const newPosts = [...prevPosts]
          const post = newPosts.splice(randomIndex, 1)[0]
          return [{ ...post, id: Date.now(), highlight: true }, ...newPosts]
        })
      }, 10000)
    }
    return () => clearInterval(interval)
  }, [posts, isLive])

  return (
    <div className="bg-[#1a1c2d]/80 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#2a2d3e] w-full max-w-3xl mx-auto">
      {/* Live Feed Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="mr-2 bg-gradient-to-r from-[#4776E6] to-[#8E54E9] w-7 h-7 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(78,119,230,0.3)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Live Feed</h2>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-3 py-1.5 rounded-full font-medium text-xs text-white transition-all shadow-sm flex items-center ${
            isLive
              ? "bg-gradient-to-r from-[#00b09b] to-[#96c93d] hover:shadow-[0_2px_8px_rgba(0,176,155,0.3)]"
              : "bg-gradient-to-r from-[#636363] to-[#a2a2a2] hover:shadow-[0_2px_8px_rgba(99,99,99,0.3)]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isLive ? "bg-white animate-pulse" : "bg-gray-300"}`}
          ></span>
          {isLive ? "Live" : "Paused"}
        </button>
      </div>

      {/* Feed Posts */}
      <div className="space-y-5">
        {feedPosts.map((post) => (
          <div
            key={post.id}
            className={`bg-[#242738] p-5 rounded-xl transition-all duration-500 border border-[#2a2d3e] hover:border-[#3a3d4e] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] ${
              post.highlight ? "animate-fadeIn border-[#4776E6]/30" : ""
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4776E6] to-[#8E54E9] flex items-center justify-center text-sm font-bold text-white shadow-[0_2px_6px_rgba(78,119,230,0.3)]">
                {post.userName ? post.userName.charAt(0) : "U"}
              </div>

              {/* Post Content */}
              <div className="flex-1 text-white">
                <h3 className="font-semibold text-lg">{post.userName}</h3>
                <p className="mt-2 text-gray-300">{post.content}</p>

                {/* Comments Section */}
                {post.comments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-xs text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
                    </div>
                    <div className="pl-3 border-l-2 border-[#4776E6]/30 space-y-1.5">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="py-0.5">
                          <p className="text-xs text-gray-300">{comment.content}</p>
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
          <div className="bg-[#242738] rounded-xl p-6 text-center border border-[#2a2d3e]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mx-auto text-gray-500 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-400 text-sm">No posts available.</p>
          </div>
        )}
      </div>
    </div>
  )
}

