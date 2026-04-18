const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/list", async (req, res) => {
    try {
        const users = await User.find({}).select("_id first_name last_name");
        res.status(200).json(users);
    } catch(err) {
        console.error(err);
        res.status(500).json({message: "Server's error"});
    }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({message: "User's id is invalid"});
    }

  try {
    const user = await User.findOne({_id: userId});
    if (!user) {
        return res.status(404).json({message: "User does not exist"});
    }
    res.status(200).json(user);
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "Server's error"});
  }
});

module.exports = router;