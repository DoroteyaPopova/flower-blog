const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema({
   flowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flower",
      required: true,
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
});

module.exports = mongoose.model("Likes", LikesSchema);
