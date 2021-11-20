const passport = require('passport');

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
                    req.login(req.user, (err)=>{
                        if(err) return err;
                        return res.redirect('/');

                    });
                }
    );
};