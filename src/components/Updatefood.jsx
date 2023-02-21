import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Updatefood = () => {
    let {id}= useParams();
    let history = useHistory();
    // let foodname = useRef();
    // let price = useRef();
    // let rating = useRef();
    // let picture  = useRef();
 
    let[foodname, setFoodname]= useState("");
    let[price, setPrice]= useState("");
    let[rating, setRating]= useState("");
    let[picture, setPicture]=useState("");

useEffect(()=>{    
    fetch("http://localhost:4000/items/"+id )
    .then(  (response)=>{  return(response.json())} )
    .then( (y)=>{
                    console.log(y);
                    setFoodname(y.foodName);
                    setPrice(y.price);
                    setRating(y.rating);
                    setPicture(y.pic);    
    } )
}, [])



    let handleupdateFood = (e)=>{

        e.preventDefault();
        let updatedFood = { foodName  :  foodname,
                        price : price,
                        type : "" ,
                        rating : rating,
                        pic : picture
                        }

        let options = document.getElementsByName("type");
        for (let i = 0; i < options.length; i++)
        {
                    if( options[i].checked )
                    {
                        updatedFood.type =  options[i].value ;
                    }
        }

        fetch("http://localhost:4000/items/"+id ,  {
                                                    method : "PUT" ,
                                                    headers : {"Content-Type" : "application/json"},
                                                    body : JSON.stringify(updatedFood)
                                                })
        .then(()=>{
            alert("Fodd has been updated");
            history.goBack();
            // history.push("/")    redirects to home page
        })
    }

  return (
        <div className="add-food">
            <h1>Update Food</h1>            <hr />
            <form onSubmit={handleupdateFood}>
                <label>Food </label>   <input type="text"   value={foodname} onChange={(e)=>{setFoodname(e.target.value)}} />
                <label>Price </label>  <input type="number" step="10"    value={price} onChange={ (e)=>{setPrice(e.target.value)} } />
                <label>Type</label>    <div className="type-opt" >
                 <input type="radio" name="type" value="Veg"/>  <label>Veg</label>
                     <input type="radio" name="type" value="Non-Veg"/>  <label>Non-Veg</label>
                                       </div>

                <label>Rating</label>  <input type="number" min="1" max="10" step="0.1"  value={rating}  onChange={ (e)=>{setRating(e.target.value)} }  />
                <label>Picture</label>  <input type="url"  value={picture} onChange={(e)=>{  setPicture(e.target.value)  }}  />


                <input type="submit" value="Update food" />

            </form>
        </div>
     );
}

 
export default Updatefood;