import React from 'react'

function UserPost() {
    return (
        <div className="w-full md:w-2/3 lg:w-1/2">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
                <div className="flex items-start gap-3">
                    <img className="h-12 w-12 rounded-full" src="https://placehold.co/400x400" alt="User profile" />
                    <div className="flex-1">
                        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Share your professional insights..."></textarea>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex gap-2">
                                <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <button className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feed Posts */}
            {[
                {
                    name: "Emma Wilson",
                    role: "Product Manager • 2h ago",
                    text: "Just launched our new product feature after months of collaboration...",
                    likes: 24,
                    comments: 8
                },
                {
                    name: "David Kim",
                    role: "Tech Lead • Yesterday",
                    text: "Interesting insights from today's engineering leadership conference...",
                    likes: 42,
                    comments: 15
                }
            ].map((post, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow overflow-hidden mb-4 transition-transform duration-200">
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <img className="h-10 w-10 rounded-full" src="https://placehold.co/400x400" alt={`${post.name} profile`} />
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">{post.name}</h4>
                                <p className="text-xs text-gray-500">{post.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-800 mb-3">{post.text}</p>
                        <div className="flex items-center gap-4 border-t border-gray-100 pt-3">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                👍 <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                💬 <span className="text-sm">{post.comments} comments</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                🔁 <span className="text-sm">Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserPost
