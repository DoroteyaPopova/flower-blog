const express = require("express");
const cors = require("cors");
const router = express.Router();
const likesController = require("../controllers/likesController");

router.use(
   cors({
      credentials: true,
      origin: "http://localhost:5173",
   })
);

router.post("/", likesController.createLike);

router.delete("/:userId/:flowerId", likesController.deleteLike);

router.get("/check/:userId/:flowerId", likesController.checkLike);

router.get("/count/flower/:flowerId", likesController.getFlowerLikesCount);

router.get("/flower/:flowerId", likesController.getFlowerLikes);

router.get("/count/user/:userId", likesController.getUserLikesCount);

router.get("/user/:userId", likesController.getUserLikes);

router.get("/top-flowers", likesController.getTopLikedFlowers);

module.exports = router;
