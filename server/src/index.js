const express = require("express");
const cookieParser = require("cookie-parser");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

mongoose
   .connect(process.env.MONGO_URL)
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// CORS configuration
const allowedOrigins = [
   "http://localhost:5173", // Local development
   "https://your-client-deployment-url.vercel.app", // Update this with your client URL after deployment
];

app.use(
   cors({
      origin: function (origin, callback) {
         // Allow requests with no origin (like mobile apps, curl requests)
         if (!origin) return callback(null, true);

         if (allowedOrigins.indexOf(origin) === -1) {
            const msg =
               "The CORS policy for this site does not allow access from the specified Origin.";
            return callback(new Error(msg), false);
         }
         return callback(null, true);
      },
      credentials: true,
   })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/rtp/users", require("./routes/authRoutes"));
app.use("/rtp/flowers", require("./routes/flowersRoutes"));
app.use("/rtp/likes", require("./routes/likesRoutes"));

// Handle OPTIONS method for preflight requests
app.options("*", cors());

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app; // Export for Vercel
