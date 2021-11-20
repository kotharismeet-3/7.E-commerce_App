//const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('Users');


module.exports = function (passport) {

    passport.use( new GoogleStrategy({
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_SECRET_KEY,
        callbackURL: 'http://localhost:5000/auth/google/callback'
        },  async (acessToken,refreshToken,profile,done) => {
            //console.log(profile);
            const newUser = {
                googleId: profile.id
            } 
            try {
                let user = await User.findOne({googleId:profile.id});

                if(user) {
                    done(null,user);
                }
                else {
                    user = await User.create(newUser);                    
                    done(null,user);
                }
            }   
            catch(err) {
                console.log(err);
            }                

        })    
    )

    passport.serializeUser((user,done) => {
        done(null,user._id);
    })
    
    passport.deserializeUser((id,done) => {
        User.findById(id)
          .then(user => {
            done(null, user);
          });    
    })    
}