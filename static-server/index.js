// import express
const express = require('express');
const app = express();

// use static content in "pages" and "js" folder
app.use(express.static('pages'));
app.use(express.static('js'));

// listen request by server on {port}
const port = 3000;
app.listen(port, function () {
  console.log('server is running on localhost:' + port);
});