 

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FullProfileView() {
  const { userId } = useParams();
  const apiUrl = 'http://localhost:3001';
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!userId) {
        console.error('User ID is missing in URL params.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${apiUrl}/api/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched raw response:', res.data);
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 h-48 rounded-t-lg shadow">
        <div className="absolute left-6 bottom-[-48px] sm:bottom-[-56px]">
          <img
            className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white shadow-lg object-cover"
            src={imageUrl && imageUrl.trim() !== "" ? imageUrl : "https://thfvnext.bing.com/th/id/OIP.PMhANanxddOBObcYxcYOcwHaGy?w=214&h=195&c=7&r=0&o=7&cb=thfvnext&dpr=1.3&pid=1.7&rm=3"}
            onError={(e) => {
              console.error('Image failed to load:', imageUrl);
              e.target.src = "https://thfvnext.bing.com/th/id/OIP.PMhANanxddOBObcYxcYOcwHaGy?w=214&h=195&c=7&r=0&o=7&cb=thfvnext&dpr=1.3&pid=1.7&rm=3";
            }}
            alt="User profile"
          />
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow pt-16 sm:pt-20 px-6 pb-8">
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

        {/* Posts Placeholder */}
        <section className="mt-10 border-t pt-6">
          <div className="mt-4 space-y-4 text-gray-500 italic">
            No posts yet.
          </div>
        </section>
      </div>
    </div>
  );
}

export default FullProfileView;


 