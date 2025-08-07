import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function SetupProfileForm({ onComplete }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const apiUrl = 'https://linkedinbackerd.vercel.app';

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    location: '',
    about: '',
    skills: '',
    experience: [],
    education: [],
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => setStep(step + 1);
  const handleSkip = () => {
    const updated = { ...formData };
    switch (step) {
      case 0:
        updated.name = '';
        updated.title = '';
        updated.location = '';
        updated.imageUrl = '';
        break;
      case 1:
        updated.about = '';
        updated.skills = '';
        break;
      case 2:
        updated.experience = [];
        break;
      case 3:
        updated.education = [];
        break;
      default:
        break;
    }
    setFormData(updated);
    setStep(step + 1);
  };

  const handleAddExperience = () => {
    const role = prompt('Role');
    const company = prompt('Company');
    const duration = prompt('Duration');
    const description = prompt('Description');
    if (role && company && duration && description) {
      setFormData({
        ...formData,
        experience: [...formData.experience, { role, company, duration, description }]
      });
    }
  };

  const handleAddEducation = () => {
    const institution = prompt('Institution');
    const degree = prompt('Degree');
    const duration = prompt('Duration');
    if (institution && degree && duration) {
      setFormData({
        ...formData,
        education: [...formData.education, { institution, degree, duration }]
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
      };

      // ✅ Post to /api/profile — no userId needed
      await axios.post(`${apiUrl}/api/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Profile saved successfully!');

      onComplete();


    } catch (error) {
      console.error('Error saving profile:', error.response?.data || error.message);
      toast.error('Failed to save profile!'); // ❌ Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      {step === 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Basic Info</h2>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full mb-2 p-2 border rounded" />
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" className="w-full mb-2 p-2 border rounded" />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full mb-2 p-2 border rounded" />
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Profile Image URL" className="w-full mb-2 p-2 border rounded" />
          <div className="flex justify-end gap-2">
            <button onClick={handleSkip} className="text-sm text-blue-600">Skip</button>
            <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">About You</h2>
          <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About yourself" className="w-full mb-2 p-2 border rounded" rows={4} />
          <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="w-full mb-2 p-2 border rounded" />
          <div className="flex justify-end gap-2">
            <button onClick={handleSkip} className="text-sm text-blue-600">Skip</button>
            <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Experience</h2>
          <button onClick={handleAddExperience} className="mb-4 px-3 py-2 bg-indigo-600 text-white rounded">Add Experience</button>
          <ul className="list-disc pl-6">
            {formData.experience.map((exp, idx) => (
              <li key={idx}>{exp.role} at {exp.company} ({exp.duration})</li>
            ))}
          </ul>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={handleSkip} className="text-sm text-blue-600">Skip</button>
            <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Education</h2>
          <button onClick={handleAddEducation} className="mb-4 px-3 py-2 bg-indigo-600 text-white rounded">Add Education</button>
          <ul className="list-disc pl-6">
            {formData.education.map((edu, idx) => (
              <li key={idx}>{edu.institution} - {edu.degree} ({edu.duration})</li>
            ))}
          </ul>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={handleSkip} className="text-sm text-blue-600">Skip</button>
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
              {loading ? 'Saving...' : 'Finish'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetupProfileForm;
