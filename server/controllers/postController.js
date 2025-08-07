
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";


export const createPost = async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.create({
      content,
      author: req.user._id,
    });
    await post.populate("author", "name");

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

 


// Add a comment to a post
export const addComment = async (req, res) => {
  const { postId, text } = req.body;
  try {
    const comment = await Comment.create({
      postId,
      author: req.user._id,
      text,
    });
    await comment.populate("author", "name");
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get comments for a post
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 

export const togglePostLike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId); // Unlike
    } else {
      post.likes.push(userId); // Like
    }

    await post.save();
    res.json({ liked: !alreadyLiked, totalLikes: post.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Get all posts created by a specific user
export const getPostsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ author: userId })
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user posts.' });
  }
};




export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (!post.author.equals(req.user._id))
      return res.status(403).json({ error: 'Unauthorized' });

    post.content = req.body.content || post.content;
    await post.save();
    await post.populate('author', 'name');
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add to postController.js
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (!post.author.equals(req.user._id))
      return res.status(403).json({ error: 'Unauthorized' });

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


























// import Post from "../models/Post.js";
// import Comment from "../models/Comment.js";


// export const createPost = async (req, res) => {
//   const { content } = req.body;
//   try {
//     const post = await Post.create({
//       content,
//       author: req.user._id,
//     });
//     await post.populate("author", "name");

//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getPublicFeed = async (req, res) => {
//   try {
//     const posts = await Post.find().populate("author", "name").sort({ createdAt: -1 });
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Add a comment to a post
// export const addComment = async (req, res) => {
//   const { postId, text } = req.body;
//   try {
//     const comment = await Comment.create({
//       postId,
//       author: req.user._id,
//       text,
//     });
//     await comment.populate("author", "name");
//     res.json(comment);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get comments for a post
// export const getComments = async (req, res) => {
//   try {
//     const comments = await Comment.find({ postId: req.params.postId })
//       .populate("author", "name")
//       .sort({ createdAt: -1 });
//     res.json(comments);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
 

// export const togglePostLike = async (req, res) => {
//   const postId = req.params.id;
//   const userId = req.user._id;

//   try {
//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).json({ error: 'Post not found' });

//     const alreadyLiked = post.likes.includes(userId);

//     if (alreadyLiked) {
//       post.likes.pull(userId); // Unlike
//     } else {
//       post.likes.push(userId); // Like
//     }

//     await post.save();
//     res.json({ liked: !alreadyLiked, totalLikes: post.likes.length });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// // Get all posts created by a specific user
// export const getPostsByUser = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const posts = await Post.find({ author: userId })
//       .populate('author', 'name')
//       .sort({ createdAt: -1 });

//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch user posts.' });
//   }
// };
