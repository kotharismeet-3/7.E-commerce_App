const dotenv = require( 'dotenv');
const express = require( 'express');
const connectDB = require( './models/mongo_db.js');
const products = require( './data/dummydata.js');
const cookieSession = require('cookie-session');
const passport = require('passport');

dotenv.config();
connectDB(); 

require( './services/passport')(passport);

const app = express();
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes.js')(app);
const port = 5000;

app.get('/api/product',(req,res) => {
    res.json(products);
});

app.get('/api/product/:id',(req,res) => {
    const product = products.find( (p) => p._id === req.params.id);
    res.json(product);
});

app.listen(port,console.log(`Server running on post${port}`));