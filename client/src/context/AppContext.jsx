// AppContext.jsx


import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = 'http://localhost:3001';

  // Axios instance with credentials
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
  });

  // Fetch user profile
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axiosInstance.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error('Error fetching user:', err.message);
      setUser(null);
    }
  };

  // Fetch post feed
  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get('/api/posts/feed');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchUser();
      await fetchPosts();
      setLoading(false);
    };

    init();
  }, []);

  return (
    <AppContext.Provider value={{ user, posts,apiUrl, loading, fetchUser, fetchPosts }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
