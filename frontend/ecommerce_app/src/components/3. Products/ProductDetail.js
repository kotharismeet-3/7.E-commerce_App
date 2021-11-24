import React from 'react';
import Rating from './Rating';
import products from './dummydata';

const ProductDetail = ({match}) => {
    

    const product = products.find((p) => p._id === match.params.id);
    return (
        <div className="flex-col"> 

          <div className="flex">
            {/*img*/}
            <img src={product.image} alt={product._id} className="m-4 p-4" />            
            {/* All other */}
            <div className="flex-col">
                {/*Name*/}
                <div  className="text-gray-900 text-6xl p-4">
                    {product.name}
                </div>
                {/*Price*/}
                <div className="text-gray-800 text-xl">
                    {product.price}$
                </div>
                {/* Stock and Reviews*/}            
                <div className="text-green-800">{product.countInStock} In stock</div>
                <div class="text-yellow-500 mb-4"><Rating value={product.rating} text={product.numReviews} /></div>
                {/*Button*/}
                <btn className="btn">
                    Buy Now
                </btn>                
            </div>
            
          </div>
          {/*Reviews to be implemented*/}              
        </div>
    );    
}

export default ProductDetail;
