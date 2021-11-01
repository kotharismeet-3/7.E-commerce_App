import React from 'react'
import Product from './Product';
import products from './dummydata';

function Products() {
    return (
        <div>
        {
            products.map((product) => {
                return <div id={product._id} className="flex justify-around">
                    <Product product={product}/>
                </div>
            })
        }        
        </div>
    )
}

export default Products;
