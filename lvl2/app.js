var express = require('express');
var app = express();
var datetime = new Date();

app.use(express.static('public'));

app.get('/cities', function(req, res){
  var cities = ['Providence', 'Cranston', 'Pawtucket', 'Warwick', 'Newport'];
  res.send(cities);
});


app.listen(process.env.PORT, function() {
  console.log('Listening on c9 lvl3');
  console.log(datetime);
 });
 
 

//chapter 4
// var bodyParser = require('body-parser');
// var parseUrlencoded = bodyParser.urlencoded({ extended:false });

// var blocks = { ... };

// app.post('/blocks', parseUrlencoded, function(request, response) {
//     var newBlock = request.body;
//     blocks[newBlock.name] = newBlock.description;
    
//     response.status(201).json(newBlock.name);
// });

// app.get('/', function(request, response) {
//   response.sendFile(__dirname + "/public/index.html");  
// })

// app.listen(process.env.PORT);