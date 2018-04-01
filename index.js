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

var mongoose = require('mongoose');
mongoose.connect('mongodb://backend:stonespassword01@ds115579.mlab.com:15579/stones-exchange');
var Users = require('./models/Users');


getUsers = function() {
  return Users.find(function(err, users) {
    if (err)
      console.log(err);
    console.log(users);
  });
};

// const u1 = new Users({
//   name: 'test',
//   email: '1111',
//   password: 'rrrrr'
// });
// u1.save();
getUsers();