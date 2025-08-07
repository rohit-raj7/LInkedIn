import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  // const apiUrl = 'http://localhost:3001';

  const apiUrl = 'https://linkedinbackerd.vercel.app';

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  // ✅ Fetch current user + profile + posts
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get(`${apiUrl}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
      setProfile(res.data.profile || null);
      setPosts(res.data.posts || []);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      setProfile(null);
    }
  };

  // ✅ Auto fetch on app load
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        apiUrl,
        user,
        setUser,
        profile,
        setProfile,
        posts,
        setPosts,
        fetchUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
