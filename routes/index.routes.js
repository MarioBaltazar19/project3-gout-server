const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// help route
router.get("/help", (req, res, next) => {
  res.json("Help route");
});

//my events route
router.get("/myevents", isAuthenticated, async (req, res, next) => {
  try {
    const findEvent = await Event.find();
    console.log(findEvent);
    res.status(200).json(findEvent);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
