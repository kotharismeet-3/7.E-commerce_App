const express = require( 'express');
const dotenv = require( 'dotenv');
const cors = require('cors');
const connectDB = require( './models/mongo_db.js');

dotenv.config();
connectDB(); 

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

require('./routes/productRoutes.js')(app);

app.use((err, req, res, next)=> {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack,
    })
})

app.listen(port,console.log(`Server running on post${port}`));