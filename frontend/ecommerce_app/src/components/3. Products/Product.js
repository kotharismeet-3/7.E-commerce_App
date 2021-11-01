import React from 'react';
import {Link} from 'react-router-dom';
import Rating from './Rating';

const Product = ({product}) => {
    return (
        <div class="flex flex-col items-center mt-4 border-4 font-sans">
            {/*img*/}
            <img src={product.image} alt={product._id} class="" />
            {/*Name*/}
            <Link to={`/product/${product._id}`} className="text-gray-900 text-2xl p-4">
                {product.name}
            </Link>
            {/*Price*/}
            <div className="text-gray-800 text-xl">
                {product.price}$
            </div>
            {/* Stock and Reviews*/}            
            <div className="text-green-800">{product.countInStock} In stock</div>
            <div class="text-yellow-500 mb-4"><Rating value={product.rating} text={product.numReviews} /></div>            
            {/*Button*/}
            <btn className="btn mb-4">
                Buy Now
            </btn>
            {/*Button*/}
            <btn className="btn">
                Add to Cart
            </btn>
        </div>
    )
}

export default Product;
