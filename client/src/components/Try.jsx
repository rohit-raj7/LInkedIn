import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ExampleComponent = () => {
  const {
    user,
    profile,
    posts,
    apiUrl,
    loading,
  } = useContext(AppContext);

  if (loading) return <p>Loading context data...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>🌐 API URL</h2>
      <p>{apiUrl}</p>

      <h3>👤 User Info</h3>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>User ID:</strong> {user?.userId}</p>

      <h3>📄 Profile Info</h3>
      <p><strong>Name:</strong> {profile?.name}</p>
      <p><strong>Title:</strong> {profile?.title}</p>
      <p><strong>About:</strong> {profile?.about}</p>
      <p><strong>Location:</strong> {profile?.location}</p>
      <p><strong>Image URL:</strong> {profile?.imageUrl || "Not uploaded"}</p>
      <p><strong>Created At:</strong> {new Date(profile?.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(profile?.updatedAt).toLocaleString()}</p>
      <p><strong>Profile ID:</strong> {profile?._id}</p>
      <p><strong>User Custom ID:</strong> {profile?.userCustomId}</p>
      <p><strong>User ID:</strong> {profile?.userId}</p>

      <h4>🎓 Education</h4>
      <ul>
        {profile?.education?.length > 0 ? profile.education.map((edu, index) => (
          <li key={index}>{JSON.stringify(edu)}</li>
        )) : <li>No education info</li>}
      </ul>

      <h4>💼 Experience</h4>
      <ul>
        {profile?.experience?.length > 0 ? profile.experience.map((exp, index) => (
          <li key={index}>{JSON.stringify(exp)}</li>
        )) : <li>No experience info</li>}
      </ul>

      <h4>🛠️ Skills</h4>
      <ul>
        {profile?.skills?.length > 0 ? profile.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        )) : <li>No skills listed</li>}
      </ul>

      <h3>📝 Posts ({posts?.length})</h3>
      {posts?.length > 0 ? posts.map(post => (
        <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <p><strong>Content:</strong> {post.content}</p>
          <p><strong>Likes:</strong> {post.likes?.length || 0}</p>
        </div>
      )) : <p>No posts available.</p>}
    </div>
  );
};

export default ExampleComponent;
