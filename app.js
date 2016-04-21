'use strict';

const PORT = process.env.PORT || 3000;

// requires:   loading libraries
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var uuid = require('uuid');

var Dog = require('./models/dog');

// app declaration
var app = express();

// general purpose middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.route('/api/dogs')
  .get((req, res, next) => {
    Dog.findAll((err, dogs) => {
      res.status(err ? 400 : 200).send(err || dogs);
    });
  })
  .post((req, res, next) => {
    Dog.create(req.body, err => {
      res.status(err ? 400 : 200).send(err || null);
    });
  });

app.route('/api/dogs/:id')
  .get((req, res, next) => {
    // get one dog

    var id = req.params.id;

    // Dog.findById(id, (err, dog) => {

    // });

    res.send();
  })
  .delete((req, res, next) => {
    var id = req.params.id;
    var len = dogs.length;
    dogs = dogs.filter(dog => dog.id !== id);

    if(len === dogs.length) {  // we didn't remove any dogs
      return res.status(400).send('Dog not found, dog.');
    }

    res.send();
  })


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
