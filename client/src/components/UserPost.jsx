 

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserPost() {
    const [postText, setPostText] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_BASE = 'http://localhost:3001'; // Change for production

    // Fetch all posts on load
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_BASE}/api/posts/feed`);
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleCreatePost = async () => {
        if (!postText.trim()) return;

        const token = localStorage.getItem('token');
        if (!token) {
            alert("You must be logged in to post.");
            return;
        }

        try {
            setLoading(true);
            await axios.post(
                `${API_BASE}/api/posts/create`,
                { content: postText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPostText('');
            fetchPosts(); // Refresh posts after adding
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
                <div className="flex items-start gap-3">
                    <img className="h-12 w-12 rounded-full" src="https://th.bing.com/th/id/OIP.PMhANanxddOBObcYxcYOcwHaGy" alt="User profile" />
                    <div className="flex-1">
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            placeholder="Share your professional insights..."
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                        />
                        <div className="flex justify-between items-center mt-3">
                            <div />
                            <button
                                onClick={handleCreatePost}
                                disabled={loading}
                                className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                {loading ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feed Posts */}
            {posts.map((post) => (
                <div key={post._id} className="bg-white rounded-lg shadow overflow-hidden mb-4">
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <img className="h-10 w-10 rounded-full" src="https://th.bing.com/th/id/OIP.PMhANanxddOBObcYxcYOcwHaGy" alt="User" />
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">{post.author?.name || 'Anonymous'}</h4>
                                <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <p className="text-gray-800 mb-3">{post.content}</p>
                        <div className="flex items-center gap-4 border-t border-gray-100 pt-3">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                👍 <span className="text-sm">0</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                💬 <span className="text-sm">0 comments</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                🔁 <span className="text-sm">Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserPost;


 