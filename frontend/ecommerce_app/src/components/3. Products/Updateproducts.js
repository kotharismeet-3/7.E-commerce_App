import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Navbar from '../1.Navigation/Navbar';

const Updateproducts = ({match}) => {
    const product_id = match.params.id;
    const [loggedIn,setLoggedIn] = useState(true);
    const [user_id,setUser_id]=useState('');
    const [name,setName]=useState('');
    const [price,setPrice]=useState();
    const [image,setImage]=useState('');
    const [brand,setBrand]=useState('');
    const [category,setCategory]=useState('');
    const [description,setDescription]=useState('');
    const [countInStock,setCountInStock]=useState();
    const [numReviews,setnumReviews]=useState();

    useEffect(() => {
        console.log('componentDidMount');
        const fetchUserId = async () => {
            try{
                const response = await axios.get("http://localhost:4950/current_user");
                setLoggedIn(true);
                console.log('IN useEffect', response);     
                setUser_id(response.data._id);
                 
                const currentProduct = await axios.get(`http://localhost:5000/api/product/${product_id}`,{
                    method : "GET",
                    headers: {"Content-Type" : "application/json"}                    
                });
                setName(currentProduct.data.name);
                setPrice(currentProduct.data.price);
                setImage(currentProduct.data.image);
                setBrand(currentProduct.data.brand);
                setCategory(currentProduct.data.category);
                setDescription(currentProduct.data.description);
                setCountInStock(currentProduct.data.countInStock);
                setnumReviews(currentProduct.data.numReviews);
            }
            catch(err) {
                console.log(err);
            }            
        }       
        fetchUserId(); 
    },[]);   

    const onUpdateProduct = async (event) => {
        event.preventDefault();
        try {            
            const body = {
                "userID": "619c8127b56b31d57e633a3a",
                "name" : name,
                 "price":price,
                 "image":image,
                 "brand":brand,
                 "category":category,
                 "description":description,
                 "countInStock":countInStock,
                 "numReviews": numReviews
            };  
            console.log(body);
            await axios.put(`http://localhost:5000/api/product/${product_id}`, body);
            console.log('Product updated');                        
        }
        catch (err) {
            
        }    
    }

    return (<div>
        <Navbar />
        <div className="mt-5 flex justify-center items-center">
        <form class="flex-col justify-center items-center w-full max-w-sm" onSubmit={onUpdateProduct}>
          <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                      Name
                  </label>
              </div>
              <div class="md:w-2/3">
                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  id="inline-full-name" type="text" value={name} onChange={event => setName(event.target.value)} />
              </div>
          </div>

          <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-price">
                  Price
                  </label>
              </div>
              <div class="md:w-2/3">
                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  id="inline-full-price" type="number" value={price} onChange={event => setPrice(event.target.value)} />
              </div>
          </div>

          <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-image">
                  Image
                  </label>
              </div>
              <div class="md:w-2/3">
                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  id="inline-full-image" type="text" alt={name}  onChange={event => setImage(event.target.value)} />
              </div>
          </div>

          <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-brand">
                  Brand
                  </label>
              </div>
              <div class="md:w-2/3">
                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  id="inline-full-brand" type="text"value={brand}  onChange={event => setBrand(event.target.value)} />
              </div>
          </div>

          <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-category">
                  Category
                  </label>
              </div>
              <div class="md:w-2/3">
                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  id="inline-full-category" type="text"value={category}  onChange={event => setCategory(event.target.value)} />
              </div>
          </div>

          <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-description">
                  Description
                  </label>
              </div>
              <div class="md:w-2/3">
                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  id="inline-full-description" type="text"value={description}  onChange={event => setDescription(event.target.value)} />
              </div>
          </div>

          <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-countInStock">
                  Count In Stcok
                  </label>
              </div>
              <div class="md:w-2/3">
                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                  id="inline-full-countInStock" type="number"value={countInStock}  onChange={event => setCountInStock(event.target.value)} />
              </div>
          </div>

          
          <div className="flex justify-center">
          {loggedIn ? <button className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
             type="submit" onSubmit={onUpdateProduct}>Update Product!</button> : 'Please Log in!'}
          </div>          
        </form>
        
    </div></div>);
}

export default Updateproducts;
