// import express
const express = require('express');
const app = express();

// use static content in "pages" folder
app.use(express.static('pages'));

// listen request by server on {port}
const port = 3000;
app.listen(port, function () {
  console.log('server is running on localhost:' + port);
});
