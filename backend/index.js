const dotenv = require( 'dotenv');
const cors = require('cors');
const express = require( 'express');

const connectDB = require( './models/mongo_db.js');

const session = require('express-session');
const passport = require('passport');

const {createProxyMiddleware} = require('http-proxy-middleware');
    
dotenv.config();
connectDB(); 

const app = express();
app.use(
    session({
        secret: process.env.cookieKey,
        resave: false,
        saveUninitialized: false
    })
);

app.use(cors());
app.use(express.json());

require('./services/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes.js')(app);
const port = 4950;

app.use(createProxyMiddleware('/', { 
    "target" : 'http://localhost:3000/',
    "changeOrigin" : true 
    }
));

app.listen(port,console.log(`Server running on post${port}`));