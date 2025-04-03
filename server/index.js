const express = require("express");
const cookieParser = require("cookie-parser");
const { mongoose } = require("mongoose");

mongoose
   .connect(process.env.MONGO_URL)
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/rtp/users", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
