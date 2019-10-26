let express = require('express');
let cors = require('cors');
let mongoose = require('mongoose');
let dbConfig = require('./database/db');
let data = require('./data');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

let movieGenre = require('./model/MovieGenreModel');
let movieModel = require('./model/MovieModel');
// movieModel.remove({name: "Truyền thuyết Ninja"}).exec((err, res) => {})
// movieModel.create(data);
let app = express();
app.listen(8080);



app.use(cors());


let movieRoute = require('./routes/movie.route');
app.use('/', movieRoute);


app.use(function (err, req, res, next) {
   console.error(err.message); 
   if (!err.statusCode) err.statusCode = 500; 
   res.status(err.statusCode).send(err.message);
 });