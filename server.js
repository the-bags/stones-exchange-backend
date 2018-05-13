'use strict';
const app = (require("express"))();
const bodyParser = require("body-parser");
const cors = require('cors');

const port = 3001;

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


app.listen(port, function() {
    console.log("\n--------------------\nServer is running\n");
    console.log("http://localhost:" + port);
    console.log("\nPress Ctrl+C to stop\n--------------------\n");
});