"use client"
import { useState, useEffect } from "react"
import TopUsers from "@/components/TopUsers"
import TrendingPosts from "@/components/TrendingPosts"
import Feed from "@/components/Feed"
import Navigation from "@/components/Navigation"
import { fetchUsers, fetchPosts, fetchComments } from "../utils/api"

export default function Home() {
  const [page, setPage] = useState("feed")
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const usersData = await fetchUsers()
        setUsers(usersData)
        const allPosts = []

        for (const userId in usersData) {
          const userName = usersData[userId]
          try {
            const userPosts = await fetchPosts(userId)
            const postsWithUser = userPosts.map((post) => ({
              ...post,
              userName,
              comments: [],
              commentCount: 0,
            }))
            allPosts.push(...postsWithUser)
          } catch (err) {
            console.error(`Error fetching posts for user ${userId}:`, err)
          }
        }

        const postsWithComments = [...allPosts]
        for (let i = 0; i < postsWithComments.length; i++) {
          const post = postsWithComments[i]
          try {
            const comments = await fetchComments(post.id)
            postsWithComments[i] = {
              ...post,
              comments,
              commentCount: comments.length,
            }
          } catch (err) {
            console.error(`Error fetching comments for post ${post.id}:`, err)
          }
        }

        setPosts(postsWithComments)
      } catch (err) {
        setError("Failed to fetch data. Using mock data instead.")
        console.error(err)
        setUsers(getMockUsers())
        setPosts(getMockPosts())
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Mock Data
  const getMockUsers = () => ({
    1: "John Doe",
    2: "Jane Doe",
    12: "Ivy Taylor",
    13: "Jack Anderson",
    14: "Lisa Jackson",
  })

  const getMockPosts = () => {
    const users = getMockUsers()
    return Object.keys(users).flatMap((userId) => [
      {
        id: 100 + Number.parseInt(userId),
        userId,
        userName: users[userId],
        content: `Post about AI by ${users[userId]}`,
        comments: [{ id: 1001, postId: 100 + Number.parseInt(userId), content: "Cool post!" }],
        commentCount: 1,
      },
      {
        id: 200 + Number.parseInt(userId),
        userId,
        userName: users[userId],
        content: `Post about tech trends by ${users[userId]}`,
        comments: [{ id: 2001, postId: 200 + Number.parseInt(userId), content: "Love this!" }],
        commentCount: 1,
      },
    ])
  }

  const renderPage = () => {
    switch (page) {
      case "topUsers":
        return <TopUsers users={users} posts={posts} />
      case "trending":
        return <TrendingPosts posts={posts} />
      case "feed":
      default:
        return <Feed posts={posts} />
    }
  }

  // Futuristic Loading Screen
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-dark-gradient">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-full border-3 border-[#4776E6]/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-t-3 border-[#4776E6] rounded-full animate-spin"></div>
        </div>
        <p className="mt-3 text-gray-400 text-xs">Loading dashboard...</p>
      </div>
    )
  }

  // Error Message UI
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-[#1a1c2d]/80 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.2)] border border-[#2a2d3e] p-4">
          <h1 className="text-2xl font-bold text-center text-white mb-6 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-[#4776E6]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Social Media Dashboard
          </h1>
          <div className="bg-[#242738] border-l-4 border-red-500 p-3 rounded-lg mb-5">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-red-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="font-medium text-sm text-red-400">Error</p>
            </div>
            <p className="text-gray-300 mt-1 text-xs">{error}</p>
          </div>
          <Navigation setPage={setPage} currentPage={page} />
          {renderPage()}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-[#1a1c2d]/80 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.2)] border border-[#2a2d3e] p-4 mb-6">
        <h1 className="text-2xl font-bold text-center text-white flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-[#4776E6]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Social Media Dashboard
        </h1>
      </div>
      <Navigation setPage={setPage} currentPage={page} />
      {renderPage()}
    </div>
  )
}

