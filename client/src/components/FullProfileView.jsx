
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullProfile from './SkeletonLoadingUi/FullProfile'

function FullProfileView() {
  const { userId } = useParams();
  // const apiUrl = 'http://localhost:3001';
  const apiUrl = 'https://linkedinbackerd.vercel.app';
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState(null);
    const [newContent, setNewContent] = useState('');
    
    const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfileWithPosts = async () => { 
      if (!userId) {
        console.error('User ID is missing in URL params.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${apiUrl}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { profile, posts } = res.data;

        if (profile.userCustomId !== userId) {
          console.warn("User ID in URL doesn't match token user.");
        }

        setProfile(profile);
        setPosts(posts);
      } catch (err) {
        console.error('Error fetching profile with posts:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileWithPosts();
  }, [userId]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${apiUrl}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
    }
  };

 const handleEdit = (post) => {
    setEditingPost(post._id);
    setNewContent(post.content);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${apiUrl}/api/posts/${editingPost}`,
        { content: newContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prev) =>
        prev.map((post) =>
          post._id === editingPost ? { ...post, content: newContent } : post
        )
      );

      setEditingPost(null);
      setNewContent('');
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
    }
  };

  if (loading) return <div>
    <FullProfile />
  </div>;
  if (!profile) return <div className="text-center mt-10 text-red-500">Profile not found.</div>;

  const {
    name = "Name not available",
    title = "Title not provided",
    location = "Location not specified",
    about = "No about info provided.",
    skills = [],
    imageUrl,
    experience = [],
    education = []
  } = profile;

  const profileImage = imageUrl && imageUrl.trim() !== "" ? imageUrl : "https://th.bing.com/th/id/OIP.PMhANanxddOBObcYxcYOcwHaGy?pid=ImgDet&w=400&h=400&rs=1";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 h-48 rounded-t-lg shadow">
        <div className="absolute left-6 bottom-[-48px] sm:bottom-[-56px]">
          <img
            className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white shadow-lg object-cover"
            src={profileImage}
            onError={(e) => {
              e.target.src = profileImage;
            }}
            alt="User profile"
          />
        </div>
      </div>

      {/* Main Body */}
      <div className="bg-white rounded-b-lg shadow pt-16 sm:pt-20 px-6 pb-8">
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            <p className="text-md text-gray-600">{title}</p>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">
              Connect
            </button>
            <button className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Message
            </button>
          </div>
        </div>

        {/* About */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">About</h2>
          <p className="mt-2 text-gray-700 leading-relaxed">{about}</p>
          {skills.length > 0 && (
            <p className="mt-2 text-gray-700">Skills: {Array.isArray(skills) ? skills.join(', ') : skills}</p>
          )}
        </section>

        {/* Experience */}
        {Array.isArray(experience) && experience.length > 0 && (
          <section className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800">Experience</h2>
            <div className="mt-4 space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://placehold.co/400x400?text=Logo"
                    alt="company logo"
                  />
                  <div>
                    <h3 className="text-md font-semibold text-gray-900">{exp.role || "Role not specified"}</h3>
                    <p className="text-sm text-gray-600">{exp.company || "Company not specified"}</p>
                    <p className="text-xs text-gray-500">{exp.duration || "Duration unknown"}</p>
                    <p className="mt-1 text-sm text-gray-700">{exp.description || "No description provided."}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {Array.isArray(education) && education.length > 0 && (
          <section className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800">Education</h2>
            <div className="mt-4 space-y-6">
              {education.map((edu, i) => (
                <div key={i} className="flex gap-4">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://placehold.co/400x400?text=Logo"
                    alt="institution logo"
                  />
                  <div>
                    <h3 className="text-md font-semibold text-gray-900">{edu.institution || "Institution not specified"}</h3>
                    <p className="text-sm text-gray-600">{edu.degree || "Degree not specified"}</p>
                    <p className="text-xs text-gray-500">{edu.duration || "Duration unknown"}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Posts - LinkedIn Style */}
         <section className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500 italic">No posts yet.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post._id} className="bg-white border border-gray-200 rounded-xl shadow p-5">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <img src={profileImage} alt="User" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900">{name}</p>
                      <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Post Content or Edit */}
                  {editingPost === post._id ? (
                    <div className="mb-3">
                      <textarea
                        className="w-full p-2 border rounded"
                        rows={3}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingPost(null)}
                          className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-800 mb-3">{post.content}</p>
                  )}

                  {/* Post Stats */}
                  <div className="text-sm text-gray-600 mb-2">{post.likes?.length || 0} Likes</div>

                  {/* Post Actions */}
                  <div className="flex justify-around border-t pt-2 text-sm text-gray-600">
                    <button className="hover:text-blue-600 transition flex items-center gap-1">👍 Like</button>
                    <button className="hover:text-blue-600 transition flex items-center gap-1">💬 Comment</button>
                    <button className="hover:text-blue-600 transition flex items-center gap-1">↗️ Share</button>
                    <button onClick={() => handleDelete(post._id)} className="hover:text-red-600 flex items-center gap-1">
                      🗑️ Delete
                    </button>
                    <button onClick={() => handleEdit(post)} className="hover:text-green-600 flex items-center gap-1">
                      ✏️ Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default FullProfileView;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import FullProfile from './SkeletonLoadingUi/FullProfile';

// function FullProfileView() {
//   const { userId } = useParams();
//   // const apiUrl = 'http://localhost:3001'; 
  
//   const apiUrl = 'https://linkedinbackerd.vercel.app';

//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingPost, setEditingPost] = useState(null);
//   const [newContent, setNewContent] = useState('');

//   useEffect(() => {
//     const fetchProfileWithPosts = async () => {
//       const token = localStorage.getItem('token');

//       if (!userId) {
//         console.error('User ID is missing in URL params.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get(`${apiUrl}/api/users/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const { profile, posts } = res.data;

//         if (profile.userCustomId !== userId) {
//           console.warn("User ID in URL doesn't match token user.");
//         }

//         setProfile(profile);
//         setPosts(posts);
//       } catch (err) {
//         console.error('Error fetching profile with posts:', err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileWithPosts();
//   }, [userId]);

//   const token = localStorage.getItem('token');

//   const handleDelete = async (postId) => {
//     try {
//       await axios.delete(`${apiUrl}/api/posts/${postId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setPosts((prev) => prev.filter((post) => post._id !== postId));
//     } catch (err) {
//       console.error('Delete error:', err.response?.data || err.message);
//     }
//   };

//   const handleEdit = (post) => {
//     setEditingPost(post._id);
//     setNewContent(post.content);
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(
//         `${apiUrl}/api/posts/${editingPost}`,
//         { content: newContent },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setPosts((prev) =>
//         prev.map((post) =>
//           post._id === editingPost ? { ...post, content: newContent } : post
//         )
//       );

//       setEditingPost(null);
//       setNewContent('');
//     } catch (err) {
//       console.error('Update error:', err.response?.data || err.message);
//     }
//   };

//   if (loading) return <FullProfile />;
//   if (!profile) return <div className="text-center mt-10 text-red-500">Profile not found.</div>;

//   const {
//     name = 'Name not available',
//     title = 'Title not provided',
//     location = 'Location not specified',
//     about = 'No about info provided.',
//     skills = [],
//     imageUrl,
//     experience = [],
//     education = [],
//   } = profile;

//   const profileImage =
//     imageUrl && imageUrl.trim() !== ''
//       ? imageUrl
//       : 'https://th.bing.com/th/id/OIP.PMhANanxddOBObcYxcYOcwHaGy?pid=ImgDet&w=400&h=400&rs=1';

//   return (
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 h-48 rounded-t-lg shadow">
//         <div className="absolute left-6 bottom-[-48px] sm:bottom-[-56px]">
//           <img
//             className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white shadow-lg object-cover"
//             src={profileImage}
//             onError={(e) => {
//               e.target.src = profileImage;
//             }}
//             alt="User profile"
//           />
//         </div>
//       </div>

//       {/* Main Body */}
//       <div className="bg-white rounded-b-lg shadow pt-16 sm:pt-20 px-6 pb-8">
//         {/* Profile Info */}
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//           <div className="space-y-1">
//             <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
//             <p className="text-md text-gray-600">{title}</p>
//             <p className="text-sm text-gray-500">{location}</p>
//           </div>
//           <div className="flex gap-3 mt-4 sm:mt-0">
//             <button className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">
//               Connect
//             </button>
//             <button className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
//               Message
//             </button>
//           </div>
//         </div>

//         {/* About */}
//         <section className="mt-8">
//           <h2 className="text-xl font-semibold text-gray-800">About</h2>
//           <p className="mt-2 text-gray-700 leading-relaxed">{about}</p>
//           {skills.length > 0 && (
//             <p className="mt-2 text-gray-700">Skills: {Array.isArray(skills) ? skills.join(', ') : skills}</p>
//           )}
//         </section>

//         {/* Experience */}
//         {Array.isArray(experience) && experience.length > 0 && (
//           <section className="mt-10 border-t pt-6">
//             <h2 className="text-xl font-semibold text-gray-800">Experience</h2>
//             <div className="mt-4 space-y-6">
//               {experience.map((exp, i) => (
//                 <div key={i} className="flex gap-4">
//                   <img className="h-12 w-12 rounded-full object-cover" src="https://placehold.co/400x400?text=Logo" alt="company logo" />
//                   <div>
//                     <h3 className="text-md font-semibold text-gray-900">{exp.role || 'Role not specified'}</h3>
//                     <p className="text-sm text-gray-600">{exp.company || 'Company not specified'}</p>
//                     <p className="text-xs text-gray-500">{exp.duration || 'Duration unknown'}</p>
//                     <p className="mt-1 text-sm text-gray-700">{exp.description || 'No description provided.'}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Education */}
//         {Array.isArray(education) && education.length > 0 && (
//           <section className="mt-10 border-t pt-6">
//             <h2 className="text-xl font-semibold text-gray-800">Education</h2>
//             <div className="mt-4 space-y-6">
//               {education.map((edu, i) => (
//                 <div key={i} className="flex gap-4">
//                   <img className="h-12 w-12 rounded-full" src="https://placehold.co/400x400?text=Logo" alt="institution logo" />
//                   <div>
//                     <h3 className="text-md font-semibold text-gray-900">{edu.institution || 'Institution not specified'}</h3>
//                     <p className="text-sm text-gray-600">{edu.degree || 'Degree not specified'}</p>
//                     <p className="text-xs text-gray-500">{edu.duration || 'Duration unknown'}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Posts */}
//         <section className="mt-10 border-t pt-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Posts</h2>
//           {posts.length === 0 ? (
//             <p className="text-gray-500 italic">No posts yet.</p>
//           ) : (
//             <div className="space-y-6">
//               {posts.map((post) => (
//                 <div key={post._id} className="bg-white border border-gray-200 rounded-xl shadow p-5">
//                   {/* Post Header */}
//                   <div className="flex items-center gap-3 mb-3">
//                     <img src={profileImage} alt="User" className="h-10 w-10 rounded-full object-cover" />
//                     <div>
//                       <p className="font-semibold text-gray-900">{name}</p>
//                       <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
//                     </div>
//                   </div>

//                   {/* Post Content or Edit */}
//                   {editingPost === post._id ? (
//                     <div className="mb-3">
//                       <textarea
//                         className="w-full p-2 border rounded"
//                         rows={3}
//                         value={newContent}
//                         onChange={(e) => setNewContent(e.target.value)}
//                       />
//                       <div className="flex gap-2 mt-2">
//                         <button
//                           onClick={handleUpdate}
//                           className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={() => setEditingPost(null)}
//                           className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <p className="text-gray-800 mb-3">{post.content}</p>
//                   )}

//                   {/* Post Stats */}
//                   <div className="text-sm text-gray-600 mb-2">{post.likes?.length || 0} Likes</div>

//                   {/* Post Actions */}
//                   <div className="flex justify-around border-t pt-2 text-sm text-gray-600">
//                     <button className="hover:text-blue-600 transition flex items-center gap-1">👍 Like</button>
//                     <button className="hover:text-blue-600 transition flex items-center gap-1">💬 Comment</button>
//                     <button className="hover:text-blue-600 transition flex items-center gap-1">↗️ Share</button>
//                     <button onClick={() => handleDelete(post._id)} className="hover:text-red-600 flex items-center gap-1">
//                       🗑️ Delete
//                     </button>
//                     <button onClick={() => handleEdit(post)} className="hover:text-green-600 flex items-center gap-1">
//                       ✏️ Edit
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }

// export default FullProfileView;
