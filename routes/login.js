const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require("../models/User");

router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        user
            ? await user.verifyPassword(req.body.password, user.password)
                ? res.json({
                    user: {
                        name: user.name,
                        email: user.email
                    },
                    token: jwt.sign({ name: user.name, email: user.email },
                        process.env.JWT_SECRET,
                        { algorithm: 'HS256' }
                    )
                })
                : res.sendStatus(403)
            : res.sendStatus(403);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
