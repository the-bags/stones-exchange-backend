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
// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
// mongoose.connect(' mongodb://127.0.0.1:27017/test');
mongoose.connect('mongodb://stones-exchange-backend:stones-backend-password01@ds251737.mlab.com:51737/stones-exchange-backend');

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
  
// // Connection URL
// const url = 'mongodb://stones-exchange-backend:stones-backend-password01@ds251737.mlab.com:51737';
//   //mongodb://<dbuser>:<dbpassword>@ds251737.mlab.com:51737/stones-exchange-backend
// // Database Name
// const dbName = 'stones-exchange-backend';
  
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
  
//   const db = client.db(dbName);
  
//   client.close();
// });
