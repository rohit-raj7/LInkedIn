import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ProfilUi from './SkeletonLoadingUi/ProfilUi';
import DummyProfile from './SkeletonLoadingUi/DummyProfile';

function Profile({ currentUser }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = 'https://linkedinbackerd.vercel.app';

    const { userId: paramUserId } = useParams();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const userId = paramUserId || currentUser?.userId || storedUser?.userId;

        if (!userId) {
            console.error("User ID is missing.");
            setLoading(false);
            return;
        }

        setUser(storedUser || currentUser);

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(res.data);
            } catch (err) {
                console.error("Error fetching profile:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [currentUser, paramUserId]);

    if (loading) {
        return <div><ProfilUi/></div>;
    }

    if (!profile) {
        return <DummyProfile />;
    }

    return (

        // <div className="w-full md:w-1/2 lg:w-1/3 mx-auto mt-10 sticky top-20 h-fit">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto mt-10 md:sticky md:top-20 h-fit">

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                {/* Profile Image */}
                <div className="flex justify-center -mt-12">
                    <img
                        src={profile.imageUrl && profile.imageUrl.trim() !== ""
                            ? profile.imageUrl
                            : "https://th.bing.com/th/id/OIP.PMhANanxddOBObcYxcYOcwHaGy"}
                        alt="Profile"
                        className="h-24 w-24 rounded-full border-4 border-white object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://th.bing.com/th/id/OIP.PMhANanxddOBObcYxcYOcwHaGy";
                        }}
                    />
                </div>

                {/* User Info */}
                <div className="text-center px-6 pb-6">
                    <h2 className="text-xl font-bold text-gray-900 mt-2">{profile.name || "Unnamed"}</h2>
                    <p className="text-sm text-gray-600">{profile.title || "No title provided"}</p>
                    <p className="mt-3 text-gray-700 text-sm">{profile.about || "No bio available."}</p>
                    <p className="mt-2 text-gray-500 text-sm">
                        <span className='text-gray-600 text-sm'>Location: </span>
                        {profile.location || "No location"}
                    </p>

                    {/* Skills */}
                    {Array.isArray(profile.skills) && profile.skills.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-xs font-semibold text-gray-400 mb-1">Skills:</h3>
                            <ul className="flex flex-wrap gap-2 justify-center">
                                {profile.skills.map((skill, index) => (
                                    <li
                                        key={index}
                                        className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Link to full profile */}
                    <Link
                        to={`/profile/${profile.userCustomId || paramUserId}`}
                        className="inline-block mt-4 text-sm text-white bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700"
                    >
                        View Full Profile
                    </Link>
                </div>
            </div>
        </div>
    );


}

export default Profile;
