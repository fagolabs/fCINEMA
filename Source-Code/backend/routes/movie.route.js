let express = require('express');
let movieRoute = express.Router();
let movieModel = require('../model/MovieModel');


movieRoute.route('/movie').get((req, res) => {
  movieModel.find().sort({id: -1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})
movieRoute.route('/detailmovie/:id').get((req, res) => {
  movieModel.find({id: req.params.id}).sort({id: -1}).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.send(data)
    }
  })
})

movieRoute.route('/search/:name').get((req, res) => {
  movieModel.find().byName(req.params.name).sort({id: -1}).exec(function(error, data) {
    if (error) {
      return next(error)
    } else {
      res.send(data);
    }
  })
})
movieRoute.route('/type/:typeName').get((req, res) => {
  movieModel.find({genre: req.params.typeName}).sort({id: -1}).exec(function(err, data){
    res.send(data);
  })
})
movieRoute.route('/theater').get((req, res) => {
  movieModel.find({theater: true}).sort({id: -1}).exec((error, data) => {
    if(error) {
      return next(error)
    } else {
      res.send(data)
    }
  })
})

module.exports = movieRoute;