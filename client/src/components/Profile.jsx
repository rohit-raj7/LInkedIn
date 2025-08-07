// import React from 'react';

// function Profile() {
//   return (
//     // Profile Page (Hidden by default)
//     <div  className="hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex flex-col">
//         <div className="profile-banner rounded-t-lg"></div>
//         <div className="bg-white rounded-b-lg shadow overflow-hidden">
//           <div className="px-6 pb-6 relative -mt-16">
//             <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
//               <div className="flex items-center gap-4">
//                 <img
//                   className="h-32 w-32 rounded-full border-4 border-white"
//                   src="https://placehold.co/400x400"
//                   alt="Professional headshot of profile user"
//                 />
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">Sarah Johnson</h1>
//                   <p className="text-lg text-gray-600">Senior UX Designer at TechCorp</p>
//                   <p className="text-sm text-gray-500">San Francisco Bay Area • 500+ connections</p>
//                 </div>
//               </div>
//               <div className="mt-4 sm:mt-0 flex gap-3">
//                 <button className="px-4 py-2 rounded-full text-sm font-medium gradient-bg text-white hover:bg-blue-700 transition-colors">
//                   Connect
//                 </button>
//                 <button className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
//                   Message
//                 </button>
//               </div>
//             </div>

//             {/* About Section */}
//             <div className="mt-6">
//               <h2 className="text-lg font-semibold text-gray-900">About</h2>
//               <p className="mt-2 text-gray-700" id="profile-about">
//                 Experienced UX designer with 7+ years in creating intuitive digital experiences.
//                 Passionate about user-centered design and accessibility. Currently leading design
//                 initiatives at TechCorp to improve product usability and customer satisfaction.
//                 Previously worked at DesignWorks Inc. where I led a team of designers to revamp
//                 their flagship product's interface.
//               </p>
//               <p className="mt-2 text-gray-700">
//                 Skills: User Research, Wireframing, Prototyping, UI Design, Design Systems
//               </p>
//             </div>

//             {/* Experience Section */}
//             <div className="mt-6 border-t border-gray-200 pt-6">
//               <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
//               <div className="mt-4 space-y-4">
//                 <div className="flex gap-4">
//                   <img className="h-12 w-12 rounded-full" src="https://placehold.co/400x400" alt="TechCorp company logo" />
//                   <div>
//                     <h3 className="font-medium text-gray-900">Senior UX Designer</h3>
//                     <p className="text-sm text-gray-600">TechCorp</p>
//                     <p className="text-xs text-gray-500">Jun 2019 - Present • 4 yrs 2 mos</p>
//                     <p className="mt-1 text-sm text-gray-700">
//                       Leading design efforts for the company's main product suite, working closely with
//                       engineering and product teams to implement user-friendly interfaces.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-4">
//                   <img className="h-12 w-12 rounded-full" src="https://placehold.co/400x400" alt="DesignWorks company logo" />
//                   <div>
//                     <h3 className="font-medium text-gray-900">UX Designer</h3>
//                     <p className="text-sm text-gray-600">DesignWorks Inc.</p>
//                     <p className="text-xs text-gray-500">Mar 2016 - May 2019 • 3 yrs 3 mos</p>
//                     <p className="mt-1 text-sm text-gray-700">
//                       Contributed to multiple client projects, specializing in creating wireframes,
//                       prototypes, and final UI designs for web and mobile applications.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Education Section */}
//             <div className="mt-6 border-t border-gray-200 pt-6">
//               <h2 className="text-lg font-semibold text-gray-900">Education</h2>
//               <div className="mt-4 flex gap-4">
//                 <img className="h-12 w-12 rounded-full" src="https://placehold.co/400x400" alt="University logo" />
//                 <div>
//                   <h3 className="font-medium text-gray-900">San Francisco State University</h3>
//                   <p className="text-sm text-gray-600">
//                     Bachelor's degree, Design and Visual Communications
//                   </p>
//                   <p className="text-xs text-gray-500">2012 - 2016</p>
//                 </div>
//               </div>
//             </div>

//             {/* Posts Section */}
//             <div className="mt-6 border-t border-gray-200 pt-6">
//               <h2 className="text-lg font-semibold text-gray-900">Sarah's Posts</h2>
//               <div id="user-posts-container" className="mt-4 space-y-4">
//                 {/* User's posts will be inserted here */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// export default Profile; 

 


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'; 



function Profile({ userId }) {
  const [profile, setProfile] = useState(null);

  // const apiUrl="https://linkedinbackerd.vercel.app"
   const apiUrl="http://localhost:3001"
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/profile/${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col">
        <div className="profile-banner rounded-t-lg bg-gradient-to-r from-indigo-500 to-blue-600 h-32"></div>
        <div className="bg-white rounded-b-lg shadow overflow-hidden">
          <div className="px-6 pb-6 relative -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-4">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                  src={profile.imageUrl || 'https://placehold.co/400x400'}
                  alt="Profile"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                  <p className="text-lg text-gray-600">{profile.title}</p>
                  <p className="text-sm text-gray-500">{profile.location}</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex gap-3">
                <button className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Connect
                </button>
                <button className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                  Message
                </button>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              <p className="mt-2 text-gray-700">{profile.about}</p>
              {profile.skills && profile.skills.length > 0 && (
                <p className="mt-2 text-gray-700">
                  <strong>Skills:</strong> {profile.skills.join(', ')}
                </p>
              )}
            </div>

            {/* Experience Section */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
              <div className="mt-4 space-y-4">
                {profile.experience.map((exp, idx) => (
                  <div className="flex gap-4" key={idx}>
                    <img className="h-12 w-12 rounded-full" src="https://placehold.co/400x400" alt="Company Logo" />
                    <div>
                      <h3 className="font-medium text-gray-900">{exp.role}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">{exp.duration}</p>
                      <p className="mt-1 text-sm text-gray-700">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900">Education</h2>
              <div className="mt-4 space-y-4">
                {profile.education.map((edu, idx) => (
                  <div className="flex gap-4" key={idx}>
                    <img className="h-12 w-12 rounded-full" src="https://placehold.co/400x400" alt="University" />
                    <div>
                      <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                      <p className="text-sm text-gray-600">{edu.degree}</p>
                      <p className="text-xs text-gray-500">{edu.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts Section */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900">{profile.name}'s Posts</h2>
              <div id="user-posts-container" className="mt-4 space-y-4">
                <p className="text-sm text-gray-600 italic">No posts to show yet.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
