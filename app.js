'use strict';

const PORT = process.env.PORT || 3000;
var dogs = [
  {name: 'Fluffy', kind: 'poodle'},
  {name: 'Doofus', kind: 'lab'}
];

// requires:   loading libraries
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// app declaration
var app = express();

// general purpose middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.route('/api/dogs')
  .get((req, res, next) => {

    res.json(dogs);
  })
  .post((req, res, next) => {
    if(!req.body.name || !req.body.kind) {
      return res.status(400).send('Missing required field.');
    }

    var dog = {
      name: req.body.name,
      kind: req.body.kind
    }
    dogs.push(dog)

    res.send();
  });


app.get('/', (req, res, next) => {
  res.send('GET /');
});


// 404 handler
app.use((req, res, next) => {
  res.status(404).send('Not found.');
});


// create server, and listen to PORT
app.listen(PORT, err => {
  console.log( err || `Server listening on port ${PORT}` );
});
