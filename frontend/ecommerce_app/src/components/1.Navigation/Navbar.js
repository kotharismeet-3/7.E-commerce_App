import React,{useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {FaSearch,FaShoppingCart} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {

    const [user_name,setUser_name] = useState('');    

    const onLoad = async () => {
        const response = await axios.get("http://localhost:4950/current_user");        
        setUser_name(response.data.name);
      };
    
      onLoad();

    return (
        <div className="navbar">
            <Link to="/" className="link">
                <img 
                    className="logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" 
                    alt="logo" 
                />
            </Link>
            <div className="search">
                <input className="search_navbar"></input>
                <span className="searchIcon_navbar"><FaSearch /></span>
            </div>

            <div className="nav">
                <Link to="/auth/google" className="link">
                    <div className="option">
                            <span className="line_one">Hello</span>
                            {(user_name !== '' ? 
                                <span className="line_two"> {user_name}</span> : 
                                <span className="line_two">Sign in</span>  
                            )}                            
                    </div>
                </Link>
                <Link to="" className="link">
                    <div className="option">
                            <span className="line_one">Return</span>
                            <span className="line_two"> Orders</span>
                    </div>
                </Link>
                <Link to="/" className="link">
                    <div className="option">
                            <span className="line_one">Your</span>
                            <span className="line_two">Prime</span>
                    </div>
                </Link>

                <Link to="/checkout" className="link">
                    <div className="option">
                        <FaShoppingCart className="cart_logo"/>                    
                        <span className="line_two">0</span>
                    </div>
                </Link>
                
            </div>
        </div>
    )
}

export default Navbar;