import User from "../models/User.js";
import Post from "../models/Post.js";

export const getUserProfile = async (req, res) => {
  try {

     const user = req.user;
    // const user = await User.findById(req.params.id).select("-password");
    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 