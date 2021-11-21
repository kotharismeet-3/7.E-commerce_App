const dotenv = require( 'dotenv');
const express = require( 'express');
const connectDB = require( './models/mongo_db.js');
const session = require('express-session');
const passport = require('passport');

dotenv.config();
connectDB(); 

require( './services/passport')(passport);

const app = express();
app.use(
    session({
        secret: process.env.cookieKey,
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
require('./routes/authRoutes.js')(app);
require('./routes/orderRoutes.js')(app);
const port = 5050;


app.use((err, req, res, next)=> {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack,
    })
})

app.listen(port,console.log(`Server running on post${port}`));