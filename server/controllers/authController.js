// controllers/authController.js
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'; // If not already installed: npm install uuid

// ==============================
// REGISTER CONTROLLER
// ==============================
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create custom userId (random short UUID)
//     const customUserId = `user_${uuidv4().slice(0, 8)}`;

//     // Create and save user
//     const newUser = new User({
//       userId: customUserId,
//       name,
//       email,
//       password: hashedPassword
//     });

//     await newUser.save();

//     // Generate JWT token with userId, not _id
//     const token = jwt.sign(
//       { userId: newUser.userId },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         userId: newUser.userId,
//         name: newUser.name,
//         email: newUser.email
//       },
//       token
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };
 

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const customUserId = `user_${uuidv4().slice(0, 8)}`;

    const newUser = new User({
      userId: customUserId,
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // 🚀 Create empty profile right after registration
    const newProfile = new Profile({
      userId: newUser._id,
      userCustomId: customUserId,
      name: name || '',
      title: '',
      location: '',
      about: '',
      skills: [],
      experience: [],
      education: [],
      imageUrl: ''
    });

    await newProfile.save();

    const token = jwt.sign(
      { userId: newUser.userId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// ==============================
// LOGIN CONTROLLER
// ==============================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT with custom userId
    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
