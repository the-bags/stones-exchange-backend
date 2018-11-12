'use strict';

const bodyParser = require("body-parser");
const cors = require('cors');
const middlewares = require('./middlewares');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL).then(db => {
    const app = (require("express"))();
    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get("/", (req, res) => {
        res.send("stones-exchange api-server");
    });

    app.use("/login", require("./routes/login"));
    app.use("/register", require("./routes/register"));

    app.use(middlewares.auth);

    app.use("/user", require("./routes/user"));
    app.use("/stones", require("./routes/stones"));


    app.listen(process.env.PORT_API || 8001, function () {
        console.log("\n--------------------------------\nServer is running\n");
        console.log("API URL    http://localhost:" + process.env.PORT_API || 8001);
        console.log("SOCKET URL http://localhost:" + process.env.PORT_SOCKET || 8002);
        console.log("\nPress Ctrl+C to stop\n--------------------------------\n");
    });

    const server = require('http').createServer(app);
    const io = require('socket.io')(server);

    let commonSpace = {};

    io.on('connection', function (client) {

        client.on('drop_stone', async (stone) => {
            delete stone.background;
            commonSpace[stone.x + ',' + stone.y] = stone;
            try {
                io.emit('drop_stone', stone);
            } catch (err) {
                console.log(err);
            }
        });
        client.on('get_space', () => {
            io.emit('space', commonSpace);
        });
        client.on('take_stone', data => {
            delete data.background;
            delete commonSpace[data.x + ',' + data.y];
            io.emit('take_stone', data);
        });
    });

    server.listen(process.env.PORT_SOCKET || 8002);
});
