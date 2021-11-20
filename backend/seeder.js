const mongoose = require('mongoose');
const dotenv = require('dotenv');;
dotenv.config();
const users = require('./data/user.js');
const products = require('./data/dummydata.js');

const connectDB = require('./models/mongo_db.js');
connectDB();
//console.log('I hope it works this time!');

const User = require('./models/userModel.js');
//const Product = require('./models/productModel.js');
//const Order = require('./models/orderProduct.js');

const importData  = async () => {
    try {
        //await Order.deleteMany();
        //await Product.deleteMany();
        await User.deleteMany();
        console.log('hi');

        const createdUsers = await User.insertMany(users);
        const adminUser = await createdUsers[0]._id;
        console.log('hello');
        /*const sampleProducts = products.map((product) => {
            return {...product, user:adminUser};
        });*/

        //await Product.insertMany(sampleProducts);
        console.log('Data inserted');
        process.exit();
    }
    catch(err) {
        console.erro(err);
        process.exit(1);
    }
};

const destoryData  = async () => {
    try {
        //await Order.deleteMany();
        //await Product.deleteMany();
        await User.deleteMany();
        console.log('Data destroyed');
        process.exit();
    }
    catch(err) {
        console.erro(err);
        process.exit(1);
    }
};

if(process.argv[2] == "-d") {
    destoryData();
} else {
    importData();
}
exports.module = [importData, destoryData];