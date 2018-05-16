'use strict';
const app = (require("express"))();
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config()

const portApi = process.env.PORT_API ? process.env.PORT_API : 8001;
const portSocket = process.env.PORT_SOCKET ? process.env.PORT_SOCKET : 8002;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/user", require("./routes/user"));
app.use("/register", require("./routes/register"));
app.use("/stones", require("./routes/stones"));


app.listen(portApi, function() {
    console.log("\n--------------------------------\nServer is running\n");
    console.log("API URL    http://localhost:" + portApi);
    console.log("SOCKET URL http://localhost:" + portSocket);
    console.log("\nPress Ctrl+C to stop\n--------------------------------\n");
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', function(client){
    client.emit('customEmit', {
        message : 'Hi, I am server'
    });
    client.emit('broadcast', {
        message: 'Hi, all'
    });
    client.on('say_for_server', function(data){
        console.log('Said me client');
        console.log(data);
    });
    client.on('disconnect', function(){
        console.log('disconnect');
    });
    console.log('connection');
});
server.listen(portSocket);
