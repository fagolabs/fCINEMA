let express = require('express');
let movieRoute = express.Router();
let movieModel = require('../model/MovieModel');
let movieGenreModel = require('../model/MovieGenreModel');
let userModel = require('../model/UserLocal');
let passport = require('passport');

movieRoute.get('/auth/fb', passport.authenticate('facebook'));
// movieRoute.get('/auth/fb/callback', passport.authenticate('facebook',{
//   failureRedirect: '/', successRedirect: '/'
// })
// )
movieRoute.route('/auth/fb/callback').get((req, res, next) => {
  passport.authenticate('facebook', function(err, user) {
    if(err) {return res.status(501).json(err);}
    req.logIn(user, function(err) {
      if(err) {return res.status(501).json(err);}
      return res.status(200).json({message: 'Login Facebook Success'});
    })
  })(req, res, next);
})
movieRoute.route('/signup').post((req, res, next) => {
  var newUser = new userModel({
    userName: req.body.userName,
    passWord: userModel.bcryptHash(req.body.passWord),
    creationDate: Date.now(),
    role: 'USER'
  })
 newUser.save((err) => {
   if(err) return next(err)
   else res.json(req.body)
 })
});
movieRoute.route('/login').post((req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message: 'Login Success'});
    });
  })(req, res, next);
})
movieRoute.get('/isLogIn', isValid, (req, res, next) => {
  return res.status(200);
})
movieRoute.get('/create', isValid, isAdministrator, function(req, res, next) {
  return res.status(200).json(req.user);
})
movieRoute.get('/logout', isValid, function(req, res, next) {
  req.logout();
  return res.status(200).json({message: 'Log out success'})
})

movieRoute.route('/create-movie').post((req, res, next) => {
  var genre = [];
  if (req.body.genre.phimhanhdong === true) genre.push("phim hành động")
  if (req.body.genre.phimvientuong === true) genre.push("phim viễn tưởng")
  if (req.body.genre.phimchientranh === true) genre.push("phim chiến tranh")
  if (req.body.genre.phimhinhsu === true) genre.push("phim hình sự")
  if (req.body.genre.phimphieuluu === true) genre.push("phim phiêu lưu")
  if (req.body.genre.phimhaihuoc === true) genre.push("phim hài hước")
  if (req.body.genre.phimvothuat === true) genre.push("phim võ thuật")
  if (req.body.genre.phimkinhdi === true) genre.push("phim kinh dị")
  if (req.body.genre.phimhoihopgaycan === true) genre.push("phim hồi hộp-gay cấn")
  if (req.body.genre.phimbiansieunhien === true) genre.push("phim bí ẩn-siêu nhiên")
  if (req.body.genre.phimcotrang === true) genre.push("phim cổ trang")
  if (req.body.genre.phimhoathinh === true) genre.push("phim hoạt hình")
  movieModel.create({
    id: req.body.id,
    name: req.body.name,
    release_year: req.body.release_year,
    run_time: req.body.run_time,
    rate: req.body.rate,
    poster_path: req.body.poster_path,
    genre: genre,
    theater: req.body.genre.phimchieurap
  })
  res.json(req.body);
});
movieRoute.route('/movie').get((req, res) => {
  movieModel.find().sort({ id: -1 }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
movieRoute.route('/genre/:id').get((req, res) => {
  movieModel.find({ id: req.params.id }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      movieGenreModel.find({ gen_id: data[0].genre }).exec((err, data) => {
        if (error) {
          return next(error);
        } else {
          res.send(data);
        }
      })
    }
  })
})
movieRoute.route('/detailmovie/:id').get((req, res) => {
  movieModel.find({ id: req.params.id }).sort({ id: -1 }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data);
    }
  })
})

movieRoute.route('/search/:name').get((req, res) => {
  movieModel.find().byName(req.params.name).sort({ id: -1 }).exec(function (error, data) {
    if (error) {
      return next(error)
    } else {
      res.send(data);
    }
  })
})
movieRoute.route('/type/:typeName').get((req, res) => {
  movieGenreModel.find({ name: req.params.typeName }).exec(function (err, data) {
    movieModel.find({ genre: data[0].gen_id }).sort({ id: -1 }).exec(function (err, data) {
      res.send(data);
    })
  })

})
movieRoute.route('/theater').get((req, res) => {
  movieModel.find({ theater: true }).sort({ id: -1 }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.send(data)
    }
  })
})
function isValid(req, res, next) {
  if(req.isAuthenticated()) next();
  else res.status(401).json({message:'Unauthorized Request'});
}
function isAdministrator(req, res, next) {
  if(req.user.role==="ADMIN") next();
  else res.status(401).json({message: "You aren't admin"})
}
module.exports = movieRoute;