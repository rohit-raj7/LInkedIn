import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // ✅ Added useLocation
import Navbar from './components/Navbar'; 
import FullProfileView from './components/FullProfileView';
import Profile from './components/Profile';
import Footer from './components/Footer';
import ProfileFeedLayout from './components/ProfileFeedLayout';

const App = () => {
  const location = useLocation(); // ✅ Hook to access current path
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    setPosts([
      {
        id: 1,
        userId: 1,
        author: 'Emma Wilson',
        content: 'Just launched our new product feature...',
        time: '2h ago',
      },
      {
        id: 2,
        userId: 2,
        author: 'David Kim',
        content: "Interesting insights from today's engineering leadership conference...",
        time: 'Yesterday',
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setIsAuthenticated={setIsAuthenticated}
      />

      <Routes>
        <Route
          path="/"
          element={<Profile currentUser={currentUser} posts={posts} />}
        />
        <Route path="/profile" element={<FullProfileView />} />
      </Routes>

      {/* ✅ Conditionally render ProfileFeedLayout */}
      {location.pathname !== '/profile' && <ProfileFeedLayout />}

      <Footer />
    </div>
  );
};

export default App;
