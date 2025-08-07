 
// controllers/profileController.js
import Profile from '../models/Profile.js';
import User from '../models/User.js';

export const createOrUpdateProfile = async (req, res) => {
  try {
    const { name, title, location, about, skills, experience, education, imageUrl } = req.body;
    const userCustomId = req.user.userId; // Custom userId from auth token

    const user = await User.findOne({ userId: userCustomId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const profile = await Profile.findOneAndUpdate(
      { userCustomId },
      {
        userId: user._id,
        userCustomId,
        name,
        title,
        location,
        about,
        skills,
        experience,
        education,
        imageUrl
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProfileByUserId = async (req, res) => {
  try {
    const userCustomId = req.params.userId || req.user.userId;

    // Find profile using custom userId (user_abc123)
    const profile = await Profile.findOne({ userCustomId });

    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
