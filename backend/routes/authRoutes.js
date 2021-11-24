const passport = require('passport');
//const User = require('../models/userModel');
let user;

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile','email']
        })
    );

    app.get('/auth/google/callback', 
        passport.authenticate('google', 
            { failureRedirect: '/login' }),
                (req, res) => {
                    // Successful authentication, redirect home.
                    req.login(req.user, (err) => {
                        if(err) return err;
                        user = req.user;
                        return res.redirect('/');

                    });
                }
    );

    app.get('/logout', (req,res) => {
        req.logout();
        res.redirect('/');
    })

    app.get('/current_user', async  (req,res)=>{
        //if(req.user) let user = await User.findById(req.user._id);        
        //console.log(req.user._id);
        res.send(req.user);
    });
};