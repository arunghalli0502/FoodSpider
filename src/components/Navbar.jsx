import { Link } from 'react-router-dom';
import foodlogo  from '../foodlogo.png'
import { useState } from "react";

const Navbar = () => {
let[searchKey, setSearchKey]=useState("")


    return ( 
            <nav>
                <div className='logo'>
                <Link to="/">
                    <img src={foodlogo} alt="logo" />
                </Link>
                <h1>Food Spiders</h1>
                </div>
                <div className="searchbar">
                    <input type="search" value={searchKey} onChange={ (e)=>{setSearchKey(e.target.value);}  }/>
                    <Link to={`/search${searchKey}`}><button> Search </button></Link>
                </div>
                <div className='navlink'>
                    <Link to="/addfood"> Add Food</Link>
                    <Link to="/orders">Your Orders</Link>
                </div>
            </nav>
           );
}
 
export default Navbar;