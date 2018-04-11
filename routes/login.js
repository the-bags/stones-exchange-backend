const express = require("express");
const User = require("../models/Users");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendStatus("Try sending some data with POST");
    res.end();
});

router.post("/", (req, res, next) => {

    // TODO check if user can login
    return User.findOne({
        name: req.body.name,
    }, function(err, user) {
        if (err) {
            res.send({
                message: "Error DB",
                error: err
            });
        }
        if (user) {
            user.verifyPassword(req.body.password, function(err, isMatch) {
                if (err) {
                    res.send({
                        message: "Error Verify Password",
                        error: err
                    });
                    return next();
                }
                //Password did not match
                if (!isMatch) {
                    res.send({
                        message: "Password is not correct! Access is denied!",
                        data: req.body
                    });
                    return next();
                }
                res.send({
                    message: "Congratulations. Access is allowed.",
                    data: req.body
                });
                return next();
            });
        } else {
            res.send({
                message: "Error. User is not exists",
                data: req.body
            });
            return next();
        }
    });
});

module.exports = router;