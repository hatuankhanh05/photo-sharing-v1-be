const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/photosOfUser/:id", async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({message: "User's id is invalid"});
    }

    try {
        const photos = await Photo.find({user_id: userId}).select("_id user_id file_name date_time comments").populate({
            path: "comments.user_id",
            select: "_id first_name last_name",
            model: User
        }).lean();

        const finalPhotos = photos.map(photo => {
            if (photo.comments) {
                photo.comments = photo.comments.map(comment => {
                    const {user_id, ...rest} = comment;
                    return {
                        ...rest,
                        user: user_id
                    };
                });
            }
            return photo;
        });

        res.status(200).json(finalPhotos);
    } catch(err) {
        console.error(err);
        res.status(500).json({message: "Server's error"});
    }
});

module.exports = router;
