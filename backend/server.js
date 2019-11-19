let express = require('express');
let cors = require('cors');
let mongoose = require('mongoose');
let dbConfig = require('./database/db');
let data = require('./data');
let bodyParser = require('body-parser');
let bcrypt = require('bcrypt');
let passport = require('passport');
let session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;

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


let app = express();
app.listen(8080);
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
   res.send("hello");
})
app.get('/login', (req, res) => {
   res.render('login');
})
app.use(cors({
   origin: ['http://localhost:4200'],
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(session({
   secret: 'private',
   name: 'myname.sid',
   resave: false,
   saveUninitialized: false,
   cookie: {
      httpOnly: true,
      secure: false
   }
}))

app.use(passport.initialize());
app.use(passport.session());
require('./passport-local-config');

require('./passport-facebook-config');

let movieRoute = require('./routes/movie.route');
app.use('/', movieRoute);


app.use(function (err, req, res, next) {
   console.error(err.message); 
   if (!err.statusCode) err.statusCode = 500; 
   res.status(err.statusCode).send(err.message);
 });