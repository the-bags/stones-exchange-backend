const express = require("express");
const User = require("../models/Users");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Try sending some data with POST");
    res.end();
});

router.post("/", (req, res, next) => {
    // TODO send userdata to DB
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    console.log(req.body);

    return user.save((err)=> {
        if (err)
            res.send({
                message: "Error DB",
                error: err
            });
        res.send({
            message: "Congratulations, you added new user!",
            data: user
        });
        return next();
    });
});

module.exports = router;