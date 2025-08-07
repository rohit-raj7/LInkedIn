import React from 'react';

const jobs = [
  { title: 'React Developer', company: 'Google', location: 'Bangalore, India' },
  { title: 'Backend Engineer', company: 'Amazon', location: 'Hyderabad, India' },
  { title: 'UI/UX Designer', company: 'Zoho', location: 'Remote' },
];

const Jobs = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Recommended Jobs</h1>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} • {job.location}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-1 text-sm rounded-full hover:bg-blue-700">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
