const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 0        
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0        
    },     
    numReviews: {
        type: String,
        required: true        
    },
    rating: {
        type: Number,
        required: true,
        default: 0        
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true        
    },
    description: {
        type: String        
    }        
}, {
    timestamps: true
});

const reviewSchema = mongoose.Schema({
    name: {type:String, required:true},
    rating: {type:Number, required: true, default:0 },
    comment: {type: String, required:true}
},{
    timestamps: true
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;