// use to import data.js into mongodb
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/moviedatabase');
let movieModel = require('../model/MovieModel')
let data = require('../data')

movieModel.createCollection().then((collection) => {
    console.log(collection)
})
data.forEach((film) => {
    //console.log(film)
    // can use insertMany, which is faster than create because it sends 1 operation only for an array
    movieModel.create({
        id:             film.id,
        name:           film.name,
        release_year:   film.release_year,
        run_time:       film.run_time,
        rate:           film.rate,
        poster_path:    film.poster_path,
        genre:          film.genre,
        theater:        film.theater
    })
})