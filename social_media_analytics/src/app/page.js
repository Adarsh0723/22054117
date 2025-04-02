"use client";
import { useState, useEffect } from 'react';
import TopUsers from '../components/TopUsers';
import TrendingPosts from '../components/TrendingPosts';
import Feed from '../components/Feed';
import Navigation from '../components/Navigation';
import { fetchUsers, fetchPosts, fetchComments } from '../utils/api';

export default function Home() {
  const [page, setPage] = useState('feed');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch users
        const usersData = await fetchUsers();
        setUsers(usersData);
        
        // Fetch posts for each user
        const allPosts = [];
        for (const userId in usersData) {
          const userName = usersData[userId];
          try {
            const userPosts = await fetchPosts(userId);
            
            // Add user information to each post
            const postsWithUser = userPosts.map(post => ({
              ...post,
              userName,
              comments: [],
              commentCount: 0
            }));
            
            allPosts.push(...postsWithUser);
          } catch (err) {
            console.error(`Error fetching posts for user ${userId}:`, err);
            // Continue with other users
          }
        }
        
        // Fetch comments for each post
        const postsWithComments = [...allPosts];
        for (let i = 0; i < postsWithComments.length; i++) {
          const post = postsWithComments[i];
          try {
            const comments = await fetchComments(post.id);
            postsWithComments[i] = {
              ...post,
              comments,
              commentCount: comments.length
            };
          } catch (err) {
            console.error(`Error fetching comments for post ${post.id}:`, err);
            // Keep default empty comments
          }
        }
        
        setPosts(postsWithComments);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
        // Use mock data if API fails
        setUsers(getMockUsers());
        setPosts(getMockPosts());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock data for development/testing
  const getMockUsers = () => {
    return {
      "1": "John Doe",
      "18": "Helen Moore",
      "12": "Ivy Taylor",
      "13": "Jack Anderson",
      "15": "Kathy Thomas",
      "14": "Lisa Jackson",
      "16": "Mike Harris",
      "17": "Nathan Clark",
      "2": "Jane Doe"
    };
  };

  const getMockPosts = () => {
    const users = getMockUsers();
    const posts = [];
    
    Object.keys(users).forEach(userId => {
      posts.push(
        {
          id: 100 + parseInt(userId),
          userId: userId,
          userName: users[userId],
          content: `Post about animals by ${users[userId]}`,
          comments: [
            { id: 1001, postId: 100 + parseInt(userId), content: "Great post!" },
            { id: 1002, postId: 100 + parseInt(userId), content: "Interesting!" }
          ],
          commentCount: 2
        },
        {
          id: 200 + parseInt(userId),
          userId: userId,
          userName: users[userId],
          content: `Post about technology by ${users[userId]}`,
          comments: [
            { id: 2001, postId: 200 + parseInt(userId), content: "I agree!" }
          ],
          commentCount: 1
        }
      );
    });
    
    return posts;
  };

  const renderPage = () => {
    switch (page) {
      case 'topUsers':
        return <TopUsers users={users} posts={posts} />;
      case 'trending':
        return <TrendingPosts posts={posts} />;
      case 'feed':
      default:
        return <Feed posts={posts} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Social Media Analytics</h1>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>Note: Using mock data as the API is currently unavailable.</p>
          <p className="text-sm">{error}</p>
        </div>
        <Navigation setPage={setPage} currentPage={page} />
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Social Media Analytics</h1>
      <Navigation setPage={setPage} currentPage={page} />
      {renderPage()}
    </div>
  );
}
