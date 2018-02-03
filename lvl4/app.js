var express = require('express');
var app = express();
var datetime = new Date();
var cities = {
  "Providence": "Rhode Island",
  "Cranston": "Rhode Island",
  "Cumberland": "Rhode Island",
  "Newport": "Rhode Island",
  "pawtucket": "Rhode Island",
  "Boston": "Massachusetts",
  "Hartford": "Connecticut",
};

app.use(express.static('public'));

app.param('name', function(req, res, next) {
   var name = req.params.name;
   var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
   req.cityName = city;
   next();
});

app.get('/cities', function(req, res){
    if (req.query.limit >= 0) { 
        res.json(cities.slice(0, req.query.limit));
   } else if (req.query.limit > cities.length) {
      res.status(404, "Error not enough Cities");
   } else  {
      res.json(Object.keys(cities));
   }
});

app.get("/cities/:name", function(req, res) {
   var description = cities[req.cityName];
   if (!description) {
      res.status(404).json("Error No description found");
   } else {
      res.json(description);
   }
});


app.listen(process.env.PORT, function() {
  console.log('Listening on c9');
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