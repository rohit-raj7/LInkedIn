 

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';  

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const token = localStorage.getItem('token');

  const { user, apiUrl, loading } = useContext(AppContext);

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/posts/comment/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.error('❌ Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post(
        `${apiUrl}/api/posts/comment`,
        { postId, text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentText('');
      fetchComments(); // Refresh comments after post
    } catch (error) {
      console.error('❌ Error posting comment:', error);
    }
  };

  return (
    <div className="mt-2">
      {/* Comment Input */}
      <input
        className="w-full border px-3 py-1 rounded text-sm mb-2"
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
        disabled={loading || !user}
      />

      {/* Display Comments */}
      <div className="space-y-1 text-sm">
        {comments.map((comment) => (
          <div key={comment._id} className="flex flex-col bg-gray-50 p-2 rounded">
            <span className="font-medium">
              {comment.author?.name || (comment.userId === user?.userId ? user.name : 'User')}
            </span>
            <span>{comment.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
