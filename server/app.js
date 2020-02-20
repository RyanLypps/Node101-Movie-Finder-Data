const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

app.use(morgan('dev'));

let cache = [];

app.get('/', (req, res) => {

    let movieId = req.query.i;
    let movieTitle = req.query.t;

    // console.log(Object.keys(cache)[0]);

    if(movieId) {
        if(cache[movieId]) {
            res.status(200).send(cache[movieId]);
        } else { 
            axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=16b7ffd4`)
        .then((response) => {
            cache[movieId] = response.data;
            res.status(200).send(response.data);
        })
        .catch(err => console.log(err))
         }
    } else if(movieTitle) {
        if(cache[movieTitle]) {
            res.status(200).send(cache[movieTitle]);
        } else {
            axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=16b7ffd4`)
            .then((response) => {
                cache[movieTitle] = response.data;
                res.status(200).send(response.data);
            })
            .catch(err => console.log(err))
        }
    } else {
        res.status(404).send('No movie searched!');
    }
  });

module.exports = app;
