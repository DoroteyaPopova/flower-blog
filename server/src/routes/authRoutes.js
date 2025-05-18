const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();
const {
   registerUser,
   loginUser,
   getProfile,
   getAllUsers,
   updateUser,
} = require("../controllers/authController");

router.use(cookieParser());

router.get("/logout", (req, res) => {
   res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
   });
   res.status(200).json({ message: "Logged out successfully" });
});

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/update", updateUser);

module.exports = router;
