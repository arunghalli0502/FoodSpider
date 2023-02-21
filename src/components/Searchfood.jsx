import { useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import Foodlist from "./Foodlist";
const Searchfood = () => {
    let{searchKey}=useParams();


    let[items , setItems] = useState( null)
    let[pending, setPending]=useState(true)
    let[error, setError]=useState(null)

    useEffect( ()=>{
        setTimeout(() => {
          fetch("http://localhost:4000/items")
          .then((response)=>{
                              if(response.ok===true)
                              {
                                return(response).json();
                              }
                              else
                              {
                                throw Error("Data not Found, please try for differnt keyword")
                              } 
                            })
          .then((data)=>{setItems(data); setPending(false)})
          .catch( ((err)=>{setError(err.message); setPending(false)} ))                        
        }, 2000);
      }, [] )
    return ( 
        <>
           <div className="home">
                {error && <h1>{error}</h1>}
                {pending && <div className="loader"></div>  }
                {items && <Foodlist items={items.filter((food)=>{ 
                   return food.foodName.toUpperCase().includes(searchKey.toUpperCase()) })} title={searchKey}/>}
            </div>
        </>
     );
}
 
export default Searchfood;