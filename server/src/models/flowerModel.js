const mongoose = require("mongoose");

const FlowerSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please enter flower name"],
      },
      description: {
         type: String,
         required: [true, "Please enter your description"],
      },
      flowerFamilly: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      owner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Flower = mongoose.model("Flower", FlowerSchema);

module.exports = Flower;
