import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Navbar from '../1.Navigation/Navbar';

const DeleteProduct = ({match}) => {
    const product_id = match.params.id;
    const [user_id,setUser_id]=useState('');
    const [loggedIn,setLoggedIn] = useState(true);

    useEffect(() => {
        console.log('componentDidMount');
        const fetchUserId = async () => {
            try{
                const response = await axios.get("http://localhost:4950/current_user");
                setLoggedIn(true);
                console.log('IN useEffect', response.data);     
                setUser_id(response.data._id); 
            }
            catch(err) {
                console.log(err);
            }            
        }       
        fetchUserId(); 
    },[]);

    const onDelete = (event) => {
        event.preventDefault();
        const Delete = async () => {
            const body ={
                "userID": "619c8127b56b31d57e633a3a"
            }
            await axios.delete(`http://localhost:5000/api/product/${product_id}`,body);
            console.log('Product Deleted!');
        }
        Delete();
    }

    if(!loggedIn) return(<div><Navbar /></div>);
    return (<div className="flex-col justify-center items-center">
        <Navbar />
        <div className="mt-10 flex-col justify-center items-center">
            <div><p>I am deleting a Product!!!</p></div>
            <div><button onClick={onDelete} className=" bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                Delete Product
            </button></div>
        </div></div>);
}

export default DeleteProduct;
