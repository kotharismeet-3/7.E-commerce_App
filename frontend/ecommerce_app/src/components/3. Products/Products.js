import React,{useState,useEffect} from 'react'
import Product from './Product';
import axios from 'axios';

function Products() {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        console.log('componentDidMount');
        const loadProducts = async () => {
            const response = await axios.get('http://localhost:5000/api/product');
            //console.log(response.data);
            setProducts(response.data);
        }
        loadProducts();
    },[]);

    if (products) {
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
    else return (<div></div>);    
}

export default Products;
