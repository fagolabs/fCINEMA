let express = require('express');
let movieRoute = express.Router();
let movieModel = require('../model/MovieModel');
let movieGenreModel = require('../model/MovieGenreModel');
let userModel = require('../model/UserLocal');
let passport = require('passport');

let ffmpeg = require('fluent-ffmpeg')
let fs = require('fs')
let path = require('path')


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

//////// stream video example

//using fs package, trying to do with ffmpeg 

movieRoute.route('/stream/:filename').get((req,res) => {
  const video = path.join(__dirname,'../stream',req.params.filename)
  const stat = fs.statSync(video)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
    const chunksize = (end-start)+1
    //trying ffmpeg
    //const file = fs.createReadStream(video, {start, end})
   


    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }// define header for http code 206 -> streaming purpose


    console.log(range, parts,start,end,head)
    res.writeHead(206, head);
    //file.pipe(res);
    var command = ffmpeg(video)
    .videoCodec('libx264')
    .withAudioCodec('aac')
    .format('mp4')
    .outputOption(['-c:v libx264 -crf 22 -c:a libfaac -movflags faststart'])
    .on('end', function () {

        console.log('Stream Done');

    })

    .on('error', function (err) {

        console.log('an error happened: ' + err.message);

        res.send(err.message);

    }).output('stream.mp4')
    .pipe(res, { end: true });
  } 
  else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    var command = ffmpeg(video)
    .videoCodec('libx264')
    .withAudioCodec('aac')
    .format('mp4')
    .outputOption(['-c:v libx264 -crf 22 -c:a libfaac -movflags faststart'])

    .on('end', function () {

        console.log('Stream Done');

    })

    .on('error', function (err) {

        console.log('an error happened: ' + err.message);

        res.send(err.message);

    })
    .output('stream.mp4')
    .pipe(res, { end: true });
    //trying ffmpeg
    //fs.createReadStream(video).pipe(res)
  }
})
////////////
function isValid(req, res, next) {
  if(req.isAuthenticated()) next();
  else res.status(401).json({message:'Unauthorized Request'});
}
function isAdministrator(req, res, next) {
  if(req.user.role==="ADMIN") next();
  else res.status(401).json({message: "You aren't admin"})
}
module.exports = movieRoute;