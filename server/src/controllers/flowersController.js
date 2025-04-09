const Flower = require("../models/flowerModel.js");
const Likes = require("../models/likesModel.js");
const jwt = require("jsonwebtoken");

const getAllFlowers = async (req, res) => {
   try {
      const flowers = await Flower.find({});
      // const flowers = {}; //Test for no flowers
      res.status(200).json(flowers);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

const getSingleFlower = async (req, res) => {
   try {
      const { id } = req.params;
      const flower = await Flower.findById(id);
      res.status(200).json(flower);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

const addflower = async (req, res) => {
   try {
      const { token } = req.cookies;
      const decodedToken = jwt.verify(token, process.env.JWT_Secret);
      const userId = decodedToken.userId;

      const { name, description, flowerFamilly, image } = req.body;
      if (!name) {
         return res.json({ error: "name is required" });
      }
      if (!description) {
         return res.json({ error: "description is required" });
      }
      if (!flowerFamilly) {
         return res.json({ error: "flowerFamilly is required" });
      }
      if (!image) {
         return res.json({ error: "image is required" });
      }
      const flower = new Flower({
         ...req.body,
         owner: userId,
      });

      await flower.save();
      res.status(201).json({ message: "Flower post created successfully" });
   } catch (error) {
      res.status(400).json({ error: error.message });
      res.json({ error: error.message });
   }
};

const updateFlower = async (req, res) => {
   try {
      const { id } = req.params;

      const flower = await Flower.findByIdAndUpdate(id, req.body);

      if (!flower) {
         return res.status(404).json({ message: "Flower not found" });
      }

      const updatedFlower = await Flower.findById(id);
      res.status(200).json(updatedFlower);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

const deleteFlower = async (req, res) => {
   try {
      const { id } = req.params;

      const flower = await Flower.findByIdAndDelete(id);

      if (!flower) {
         return res.status(404).json({ message: "Flower not found" });
      }
      await Likes.deleteMany({ flowerId: id });

      res.status(200).json({ message: "Flower deleted succesfully!" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

const getUserFlowers = async (req, res) => {
   try {
      const { userId } = req.params;
      const flowers = await Flower.find({ owner: userId });
      res.status(200).json(flowers);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

module.exports = {
   getAllFlowers,
   getSingleFlower,
   addflower,
   updateFlower,
   deleteFlower,
   getUserFlowers,
};
