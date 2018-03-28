"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var portNumber = 8080;
var app = express();
var users = [];
for (var i = 0; i <= 10; i++)
    users[i] = "nameOfUser" + i;
var start = function () {
    console.log("Server start on " + portNumber);
};
app.get("/", function (req, res) {
    res.send("Hello on this server!");
});
app.get("/users", function (req, res) {
    res.send(users);
});
app.get("/user/:id", function (req, res) {
    var request = req.params["id"];
    if (users[request])
        res.send(users[request]);
    else
        res.send("No such user");
});
app.listen(portNumber, start);
