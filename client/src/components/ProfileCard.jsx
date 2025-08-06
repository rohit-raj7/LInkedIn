

// import React from 'react';
// import { Link } from 'react-router-dom';

// function ProfileCard() {
//     return (
//         <>
//             {/* Sidebar Profile Card */}
//             <div className="w-full md:w-1/3 lg:w-1/4">
//                 <div className="bg-white rounded-lg shadow overflow-hidden">
//                     <div className="profile-banner"></div>
//                     <div className="px-4 pb-6 relative -mt-12">
//                         <div className="flex justify-center">
//                             <img className="h-24 w-24 rounded-full border-4 border-white" src="https://placehold.co/400x400" alt="User headshot" />
//                         </div>
//                         <div className="text-center mt-4">
//                             <h2 className="text-lg font-semibold text-gray-900" id="profile-name">Sarah Johnson</h2>
//                             <p className="text-sm text-gray-500" id="profile-title">Senior UX Designer at TechCorp</p>
//                         </div>
//                         <div className="mt-4 text-sm text-gray-700" id="profile-bio">
//                             Experienced UX designer passionate about creating intuitive digital experiences. Previously at DesignWorks Inc.
//                         </div>
//                         <div className="mt-4 border-t border-gray-200 pt-4">
//                             <h3 className="text-sm font-medium text-gray-500">Connections</h3>
//                             <p className="text-sm font-semibold text-blue-600 mt-1">500+ connections</p>
//                             {/* Full Profile View */}
//                             <Link to="/profile" className="text-sm text-blue-600 hover:underline mt-4 block text-center">
//                                 View Full Profile
//                             </Link>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Suggestions */}
//                 <div className="bg-white rounded-lg shadow mt-4 p-4">
//                     <h3 className="text-sm font-medium text-gray-900 mb-2">Suggestions for You</h3>
//                     <div className="space-y-3">
//                         {[
//                             { name: "Michael Brown", title: "Project Manager at BuildRight" },
//                             { name: "Alex Chen", title: "Software Developer at CodeForge" },
//                             { name: "Emily Rodriguez", title: "Marketing Specialist at BrandWorks" }
//                         ].map((person, index) => (
//                             <div className="flex items-center gap-3" key={index}>
//                                 <img className="h-10 w-10 rounded-full" src="https://placehold.co/400x400" alt={`${person.name} profile`} />
//                                 <div className="flex-1 min-w-0">
//                                     <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
//                                     <p className="text-sm text-gray-500 truncate">{person.title}</p>
//                                 </div>
//                                 <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Connect</button>
//                             </div>
//                         ))}
//                     </div>
//                     <button className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 font-medium">See all</button>
//                 </div>
//             </div>


//         </>
//     );
// }

// export default ProfileCard;





import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
    return (
        <div className="w-full md:w-1/3 lg:w-1/4">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
                {/* Banner */}
                <div className="h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                {/* Profile Image */}
                <div className="flex justify-center -mt-14">
                    <img
                        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                        src="https://placehold.co/400x400"
                        alt="User headshot"
                    />
                </div>

                {/* Profile Info */}
                <div className="px-6 pb-6 pt-2 text-center">
                    <h2 className="text-xl font-bold text-gray-900" id="profile-name">Sarah Johnson</h2>
                    <p className="text-sm text-gray-600 mt-1" id="profile-title">Senior UX Designer at TechCorp</p>

                    <p className="mt-4 text-sm text-gray-700" id="profile-bio">
                        Experienced UX designer passionate about creating intuitive digital experiences. Previously at DesignWorks Inc.
                    </p>

                    <div className="mt-4 border-t pt-4">
                        <h3 className="text-xs font-semibold text-gray-400">Connections</h3>
                        <p className="text-sm font-semibold text-blue-600 mt-1">500+ connections</p>

                        {/* View Full Profile */}
                        <Link
                            to="/profile"
                            className="inline-block mt-4 text-sm text-white bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700 transition"
                        >
                            View Full Profile
                        </Link>
                    </div>
                </div>
            </div>

            {/* Suggestions Card */}
            <div className="bg-white rounded-xl shadow-lg mt-6 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Suggestions for You</h3>

                <div className="space-y-4">
                    {[
                        { name: "Michael Brown", title: "Project Manager at BuildRight" },
                        { name: "Alex Chen", title: "Software Developer at CodeForge" },
                        { name: "Emily Rodriguez", title: "Marketing Specialist at BrandWorks" }
                    ].map((person, index) => (
                        <div className="flex items-center gap-3" key={index}>
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src="https://placehold.co/400x400"
                                alt={`${person.name} profile`}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                                <p className="text-sm text-gray-500 truncate">{person.title}</p>
                            </div>
                            <button className="text-blue-600 hover:underline text-sm font-medium">Connect</button>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 font-semibold">
                    See all
                </button>
            </div>
        </div>
    );
}

export default Profile;
