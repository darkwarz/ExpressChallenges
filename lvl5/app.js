var express = require('express');
var app = express();
var datetime = new Date();
var city = require('./routes/cities');

app.use(express.static('public'));

app.use('/cities', city);

app.listen(process.env.PORT, function() {
  console.log('Listening on c9');
  console.log(datetime);
 });
 