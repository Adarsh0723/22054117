"use client";
import { useState, useEffect } from "react";
import TopUsers from "../components/TopUsers";
import TrendingPosts from "../components/TrendingPosts";
import Feed from "../components/Feed";
import Navigation from "../components/Navigation";
import { fetchUsers, fetchPosts, fetchComments } from "../utils/api";

export default function Home() {
  const [page, setPage] = useState("feed");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const usersData = await fetchUsers();
        setUsers(usersData);
        const allPosts = [];

        for (const userId in usersData) {
          const userName = usersData[userId];
          try {
            const userPosts = await fetchPosts(userId);
            const postsWithUser = userPosts.map((post) => ({
              ...post,
              userName,
              comments: [],
              commentCount: 0,
            }));
            allPosts.push(...postsWithUser);
          } catch (err) {
            console.error(`Error fetching posts for user ${userId}:`, err);
          }
        }

        const postsWithComments = [...allPosts];
        for (let i = 0; i < postsWithComments.length; i++) {
          const post = postsWithComments[i];
          try {
            const comments = await fetchComments(post.id);
            postsWithComments[i] = {
              ...post,
              comments,
              commentCount: comments.length,
            };
          } catch (err) {
            console.error(`Error fetching comments for post ${post.id}:`, err);
          }
        }

        setPosts(postsWithComments);
      } catch (err) {
        setError("Failed to fetch data. Using mock data instead.");
        console.error(err);
        setUsers(getMockUsers());
        setPosts(getMockPosts());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock Data
  const getMockUsers = () => ({
    "1": "John Doe",
    "2": "Jane Doe",
    "12": "Ivy Taylor",
    "13": "Jack Anderson",
    "14": "Lisa Jackson",
  });

  const getMockPosts = () => {
    const users = getMockUsers();
    return Object.keys(users).flatMap((userId) => [
      {
        id: 100 + parseInt(userId),
        userId,
        userName: users[userId],
        content: `Post about AI by ${users[userId]}`,
        comments: [{ id: 1001, postId: 100 + parseInt(userId), content: "Cool post!" }],
        commentCount: 1,
      },
      {
        id: 200 + parseInt(userId),
        userId,
        userName: users[userId],
        content: `Post about tech trends by ${users[userId]}`,
        comments: [{ id: 2001, postId: 200 + parseInt(userId), content: "Love this!" }],
        commentCount: 1,
      },
    ]);
  };

  const renderPage = () => {
    switch (page) {
      case "topUsers":
        return <TopUsers users={users} posts={posts} />;
      case "trending":
        return <TrendingPosts posts={posts} />;
      case "feed":
      default:
        return <Feed posts={posts} />;
    }
  };

  // Futuristic Loading Screen
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-dark-gradient">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
      </div>
    );
  }

  // Error Message UI
  if (error) {
    return (
      <div className="container mx-auto px-6 py-8 bg-glass rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">🚀 Social Media Dashboard</h1>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
          <p className="font-semibold">⚠️ Error:</p>
          <p>{error}</p>
        </div>
        <Navigation setPage={setPage} currentPage={page} />
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 bg-glass rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8">🚀 Social Media Dashboard</h1>
      <Navigation setPage={setPage} currentPage={page} />
      {renderPage()}
    </div>
  );
}
