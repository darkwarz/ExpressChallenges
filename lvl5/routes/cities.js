var express = require('express');

var router = express.Router();
console.log(router);
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var cities = {
  "Providence": "Rhode Island",
  "Cranston": "Rhode Island",
  "Cumberland": "Rhode Island",
  "Newport": "Rhode Island",
  "pawtucket": "Rhode Island",
  "Boston": "Massachusetts",
  "Hartford": "Connecticut",
};

router.route('/')
    .get(function(request, response) {
        if (request.query.limit > cities.length) {
        response.status(404).json('Error: limit may not exceed' + cities.length);
        }   
        if (request.query.limit > 0) {
         response.json(cities.slice(0, request.query.limit));
        } else {   
         response.json(Object.keys(cities));
        }
    })
    .post(parseUrlencoded, function (request, response) {
        var newCity = request.body;
        if (newCity.city.length >= 4 && newCity.state.length >= 2) {
         cities[newCity.city] = newCity.state;
         response.status(201).json(newCity.city);
        } else {
         console.log('Enter a valid city and state');
         response.status(400).json('Please enter a valid city and state');
        }
    });
   
router.route('/:name')   
    .all(function(request, response, next) {
        var name = request.params.name;
        var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
        request.cityName = city;
        next();
    })
    .get(function(request, response) {
        var state = cities[request.cityName];
        if (!state) {
         response.status(400).json('City not found!');
        } else {
         response.json(state);
        }
    })
    .delete(function(request, response) {
        delete cities[request.cityName];
        response.status(200);
    });
   
module.exports = router;