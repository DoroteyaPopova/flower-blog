const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
   getAllFlowers,
   getSingleFlower,
   addflower,
   updateFlower,
   deleteFlower,
   getUserFlowers,
} = require("../controllers/flowersController.js");

router.use(
   cors({
      credentials: true,
      origin: "http://localhost:5173",
   })
);

router.get("/catalog", getAllFlowers);
router.get("/:id", getSingleFlower);
router.post("/upload", addflower);
router.put("/:id", updateFlower);
router.delete("/:id", deleteFlower);
router.get("/user/:userId", getUserFlowers);

module.exports = router;
