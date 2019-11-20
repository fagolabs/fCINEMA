let passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;


var UserFb = require('./model/UserFb');
passport.use(new FacebookStrategy({
   clientID: "2133457410295616",
   clientSecret: "08178404be0bfb0c0a6584d12d125f46",
   callbackURL: "http://localhost:8080/auth/fb/callback",
   // profileFields: ['email', 'displayName']
   },
   function(accessToken, refreshToken, profile, done) {
       UserFb.findOne({id: profile._json.id}, (err, user) => {
          if(err) return done(err)
          if(user) return done(null, user)
          const newUser = new UserFb({
                id: profile._json.id,
                name: profile._json.name,
                email: 'haiquanluong03031998@gmail.com'
          })
          newUser.save((err) => {
             return done(null, newUser)
          })
       })
   }
))

passport.serializeUser(function (user, done) {
   done(null, user.id);
});

passport.deserializeUser(function (id, done) {
   UserFb.findById(id, function (err, user) {
       done(err, user);
   });
});
