const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const registerUser = async (req, res) => {
   try {
      const { email, username, password, repass } = req.body;
      if (!email) {
         return res.json({ error: "Email is required" });
      }
      if (!username) {
         return res.json({ error: "Username is required" });
      }
      if (!password || password.length < 6) {
         return res.json({
            error: "Password is required and should be at least 6 characters long!",
         });
      }
      if (password !== repass) {
         return res.json({ error: "Passwords do not match" });
      }
      const exist = await User.findOne({ email });
      if (exist) {
         return res.json({ error: "Email is already taken" });
      }

      const user = new User({ email, username, password });
      await user.save();

      const token = jwt.sign(
         { userId: user.id, email, username },
         process.env.JWT_Secret,
         {
            expiresIn: "1w",
         }
      );

      res.status(201).json({
         message: "User registered successfully",
         user: {
            id: user.id,
            email: user.email,
            username: user.username,
         },
         token,
      });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.json({ error: "User not found." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.json({ error: "Wrong password!" });

      const token = jwt.sign(
         { userId: user.id, email: user.email, username: user.username },
         process.env.JWT_Secret,
         {
            expiresIn: "1w",
         }
      );

      res.status(200).json({
         message: "Logged in successfully",
         user: {
            id: user.id,
            email: user.email,
            username: user.username,
         },
         token,
      });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const getProfile = (req, res) => {
   // Get token from Authorization header instead of cookies
   const authHeader = req.headers.authorization;
   const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

   if (token) {
      jwt.verify(token, process.env.JWT_Secret, async (err, decodedToken) => {
         if (err) {
            res.status(401).json({ error: "Unauthorized" });
            return;
         } else {
            const data = await User.findById(decodedToken.userId);
            const user = {
               id: data.id,
               email: data.email,
               username: data.username,
            };
            res.status(200).json({ user, token });
         }
      });
   } else {
      res.status(401).json({ error: "No token provided" });
   }
};

const updateUser = async (req, res) => {
   try {
      const { id } = req.body;

      const user = await User.findByIdAndUpdate(id, req.body);

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await User.findById(id);
      res.status(200).json(updatedUser);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

const getAllUsers = async (req, res) => {
   try {
      const users = await User.find({});
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

module.exports = {
   registerUser,
   loginUser,
   getProfile,
   updateUser,
   getAllUsers,
};
