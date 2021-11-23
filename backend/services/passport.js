const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('../models/userModel');
const User = mongoose.model('User');


module.exports = function (passport) {

    passport.use( new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        callbackURL: 'http://localhost:5000/auth/google/callback'
        },  async (acessToken,refreshToken,profile,done) => {
            console.log(profile);
            const newUser = {
                googleId : profile.id,
                name: profile.name.givenName,
                email: profile.emails[0].value,
                password: 'tets@1234'                
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