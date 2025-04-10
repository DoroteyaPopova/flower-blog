const Likes = require("../models/likesModel");
const Flower = require("../models/flowerModel");

exports.createLike = async (req, res) => {
   try {
      const existingLike = await Likes.findOne({
         userId: req.body.userId,
         flowerId: req.body.flowerId,
      });

      if (existingLike) {
         return res
            .status(409)
            .json({ message: "You have already liked this flower" });
      }

      const like = new Likes(req.body);

      await like.save();
      res.status(201).json(like);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

exports.deleteLike = async (req, res) => {
   try {
      const result = await Likes.findOneAndDelete({
         userId: req.params.userId,
         flowerId: req.params.flowerId,
      });

      if (!result) {
         return res.status(404).json({ message: "Like not found" });
      }

      res.status(200).json({ message: "You have unliked the flower" });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

exports.checkLike = async (req, res) => {
   try {
      const like = await Likes.findOne({
         userId: req.params.userId,
         flowerId: req.params.flowerId,
      });

      res.status(200).json({ liked: !!like });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

exports.getFlowerLikesCount = async (req, res) => {
   try {
      const count = await Likes.countDocuments({
         flowerId: req.params.flowerId,
      });
      res.status(200).json({ count });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

exports.getFlowerLikes = async (req, res) => {
   try {
      const likes = await Likes.find({ flowerId: req.params.flowerId });
      res.status(200).json(likes);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

exports.getUserLikesCount = async (req, res) => {
   try {
      const count = await Likes.countDocuments({ userId: req.params.userId });
      res.status(200).json({ count });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

exports.getUserLikes = async (req, res) => {
   try {
      const likes = await Likes.find({ userId: req.params.userId });
      res.status(200).json(likes);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

exports.getTopLikedFlowers = async (req, res) => {
   try {
      const topFlowers = await Likes.aggregate([
         { $group: { _id: "$flowerId", likeCount: { $sum: 1 } } },
         { $sort: { likeCount: -1 } },
         { $limit: 3 },
      ]);

      const result = await Promise.all(
         topFlowers.map(async (item) => {
            const flower = await Flower.findById(item._id);
            return {
               flower,
               likeCount: item.likeCount,
            };
         })
      );

      // const result = []; //No flowers test
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};
