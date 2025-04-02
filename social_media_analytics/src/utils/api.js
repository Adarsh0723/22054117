const API_BASE_URL = 'http://20.244.56.144/evaluation-service';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA0MDA0LCJpYXQiOjE3NDM2MDM3MDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY4ZmFjODRmLTc4Y2QtNGFlZC1hZTFhLWM4ZmMzNTc2NGRjYSIsInN1YiI6IjIyMDU0MTE3QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1NDExN0BraWl0LmFjLmluIiwibmFtZSI6ImFkYXJzaCBzaGFyYW4iLCJyb2xsTm8iOiIyMjA1NDExNyIsImFjY2Vzc0NvZGUiOiJud3B3cloiLCJjbGllbnRJRCI6IjY4ZmFjODRmLTc4Y2QtNGFlZC1hZTFhLWM4ZmMzNTc2NGRjYSIsImNsaWVudFNlY3JldCI6ImRwZG5XSEdnU2hOSmhwZXEifQ.1jPpU9jLJWldyxeczi0EoXhk4-u93yOTJ1brk12adfM';

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

export async function fetchUsers() {
  try {
    // Direct fetch to API server instead of using Next.js API route
    const response = await fetch(`${API_BASE_URL}/users`, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function fetchPosts(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
}

export async function fetchComments(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    return data.comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
}