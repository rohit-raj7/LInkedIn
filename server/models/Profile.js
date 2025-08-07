// models/Profile.js
import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  duration: String,
  description: String,
});

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  duration: String,
});

const profileSchema = new mongoose.Schema({
  userId: { // MongoDB ObjectId reference
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  userCustomId: {
  type: String,
  required: true,
  unique: true,
  index: true // helps with fast lookups
},
  name: String,
  title: String,
  location: String,
  about: String,
  skills: [String],
  experience: [experienceSchema],
  education: [educationSchema],
  imageUrl: String,
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
