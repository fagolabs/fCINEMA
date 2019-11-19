var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var User = require('./model/UserLocal');
passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'passWord'
},
    function (username, password, done) {
        User.findOne({ userName: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.isValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
