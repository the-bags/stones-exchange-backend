import express = require("express");

let portNumber: number = 8080;
let app = express();

let users: string[] = [];
for (let i: number = 0; i <= 10; i++)
    users[i] = "nameOfUser" + i;

let start = function () {
    console.log("Server start on " + portNumber);
};

app.get("/", (req, res) => {
    res.send("Hello on this server!");
});
app.get("/users", (req, res) => {
    res.send(users);
});
app.get("/user/:id", (req, res) => {
    let request = req.params["id"];
    if (users[request])
        res.send(users[request]);
    else res.send("No such user");
});

app.listen(portNumber, start);