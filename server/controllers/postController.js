
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";


export const createPost = async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.create({
      content,
      author: req.user._id,
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPublicFeed = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
