const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
   cors({
      origin: true,
      credentials: true,
   })
);

// Add this before your other routes
app.get("/", (req, res) => {
   res.status(200).json({
      message: "Flower Blog API is running",
      endpoints: {
         flowers: "/rtp/flowers/catalog",
         users: "/rtp/users",
         likes: "/rtp/likes",
      },
   });
});

// API routes - explicitly define these first
app.use("/rtp/users", require("./routes/authRoutes"));
app.use("/rtp/flowers", require("./routes/flowersRoutes"));
app.use("/rtp/likes", require("./routes/likesRoutes"));

// MongoDB connection
mongoose
   .connect(process.env.MONGO_URL || "mongodb://localhost:27017/rtp")
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error("MongoDB connection error:", err));

if (process.env.NODE_ENV !== "production") {
   // Start server in development
   const port = process.env.PORT || 8000;
   app.listen(port, () => console.log(`Server running on port ${port}`));
}

// Export for Vercel serverless functions
module.exports = app;
