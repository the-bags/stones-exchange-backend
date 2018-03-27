//import express
var express = require('express');
var app = express();

//use static content in "pages" folder
app.use(express.static('pages'))

//listen request by server on port 3000 
app.listen(3000);