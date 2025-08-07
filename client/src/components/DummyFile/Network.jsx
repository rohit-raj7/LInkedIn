import React from 'react';

const connections = [
  { name: 'Riya Sharma', title: 'Frontend Developer at TCS' },
  { name: 'Amit Verma', title: 'Product Manager at Infosys' },
  { name: 'Sneha Patel', title: 'UX Designer at Adobe' },
];

const Network = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Your Connections</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {connections.map((person, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg border hover:shadow-lg transition">
            <div className="h-20 w-20 bg-gray-200 rounded-full mb-3 mx-auto"></div>
            <h2 className="text-lg font-semibold text-center">{person.name}</h2>
            <p className="text-sm text-gray-500 text-center">{person.title}</p>
            <button className="mt-3 block mx-auto bg-blue-600 text-white text-sm px-4 py-1 rounded-full hover:bg-blue-700">
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Network;
