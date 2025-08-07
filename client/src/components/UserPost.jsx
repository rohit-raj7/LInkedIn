import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection';
import { AppContext } from '../context/AppContext';

function UserPost() {
  const { apiUrl, user, profile } = useContext(AppContext);
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // for creating post
  const [loadingPosts, setLoadingPosts] = useState(true); // for loading posts
  const [openComments, setOpenComments] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const res = await axios.get(`${apiUrl}/api/posts/feed`);
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleCreatePost = async () => {
    const token = localStorage.getItem('token');
    if (!postText.trim() || !token) return;

    try {
      setLoading(true);
      await axios.post(
        `${apiUrl}/api/posts/create`,
        {
          content: postText,
          userId: user?.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPostText('');
      fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post(
        `${apiUrl}/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPosts();
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="w-full px-2 md:w-2/3 lg:w-1/2 mx-auto">
      {/* Create Post */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex items-start gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={
              profile?.imageUrl ||
              'https://img.freepik.com/premium-photo/girl-happy-portrait-user-profile-by-ai_1119669-10.jpg'
            }
            alt="User profile"
          />
          <div className="flex-1">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Share your professional insights..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleCreatePost}
                disabled={loading}
                className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                {loading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loadingPosts ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-4 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow overflow-hidden mb-4"
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={
                    post.author?.imageUrl ||
                    'https://img.freepik.com/premium-photo/girl-happy-portrait-user-profile-by-ai_1119669-10.jpg'
                  }
                  alt="User"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {post.author?.name || 'Anonymous'}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-3">{post.content}</p>

              <div className="flex items-center gap-4 border-t border-gray-100 pt-3 text-sm">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                >
                  👍 <span>{post.likes?.length || 0}</span>
                </button>
                <button
                  onClick={() => toggleComments(post._id)}
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                >
                  💬 <span>Comment</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                  🔁 <span>Share</span>
                </button>
              </div>

              {openComments[post._id] && <CommentSection postId={post._id} />}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserPost;
