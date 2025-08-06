 

import React from 'react';

function FullProfileView() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner and Profile Image */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 h-48 rounded-t-lg shadow">
        <div className="absolute left-6 bottom-[-48px] sm:bottom-[-56px]">
          <img
            className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white shadow-lg object-cover"
            src="https://placehold.co/400x400"
            alt="User profile"
          />
        </div>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white rounded-b-lg shadow pt-16 sm:pt-20 px-6 pb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Sarah Johnson</h1>
            <p className="text-md text-gray-600">Senior UX Designer at TechCorp</p>
            <p className="text-sm text-gray-500">San Francisco Bay Area • 500+ connections</p>
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
          <p className="mt-2 text-gray-700 leading-relaxed">
            Experienced UX designer with 7+ years in creating intuitive digital experiences.
            Passionate about user-centered design and accessibility. Leading design initiatives at
            TechCorp to improve product usability and customer satisfaction.
            Previously at DesignWorks Inc. where I led a team of designers to revamp their flagship product's interface.
          </p>
          <p className="mt-2 text-gray-700">Skills: User Research, Wireframing, Prototyping, UI Design, Design Systems</p>
        </section>

        {/* Experience */}
        <section className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800">Experience</h2>
          <div className="mt-4 space-y-6">
            {[{
              company: "TechCorp",
              role: "Senior UX Designer",
              duration: "Jun 2019 - Present • 4 yrs 2 mos",
              description: "Leading design efforts for the company's main product suite, working closely with engineering and product teams.",
              logo: "https://placehold.co/400x400"
            }, {
              company: "DesignWorks Inc.",
              role: "UX Designer",
              duration: "Mar 2016 - May 2019 • 3 yrs 3 mos",
              description: "Contributed to multiple client projects with wireframes, prototypes, and final UI designs.",
              logo: "https://placehold.co/400x400"
            }].map((job, i) => (
              <div key={i} className="flex gap-4">
                <img className="h-12 w-12 rounded-full object-cover" src={job.logo} alt={`${job.company} logo`} />
                <div>
                  <h3 className="text-md font-semibold text-gray-900">{job.role}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-xs text-gray-500">{job.duration}</p>
                  <p className="mt-1 text-sm text-gray-700">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800">Education</h2>
          <div className="mt-4 flex gap-4">
            <img className="h-12 w-12 rounded-full" src="https://placehold.co/400x400" alt="University logo" />
            <div>
              <h3 className="text-md font-semibold text-gray-900">San Francisco State University</h3>
              <p className="text-sm text-gray-600">Bachelor's in Design and Visual Communications</p>
              <p className="text-xs text-gray-500">2012 - 2016</p>
            </div>
          </div>
        </section>

        {/* Posts Placeholder */}
        <section className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800">Sarah's Posts</h2>
          <div id="user-posts-container" className="mt-4 space-y-4 text-gray-500 italic">
            {/* Dynamic posts would go here */}
            No posts yet.
          </div>
        </section>
      </div>
    </div>
  );
}

export default FullProfileView;
