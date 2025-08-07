// controllers/userController.js
import User from "../models/User.js";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user; // custom userId string like 'user_123abc'

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });
    const profile = await Profile.findOne({ userCustomId: userId });

    res.json({ user: {
      userId: user.userId,
      name: user.name,
      email: user.email
    }, profile, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
