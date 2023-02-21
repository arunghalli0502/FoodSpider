import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import useFetch from "../Custome Hook/useFetch";

const Fooddetails = () => {

    let {id}=useParams();
    let{data:item, pending, error}=useFetch("http://localhost:4000/items/"+id)
    let history=useHistory();
    let[ordersId, setOrdersId]= useState([]);

    useEffect( ()=>{

        let orders=localStorage.getItem("orders")
        orders= JSON.parse(orders);
        let o=orders.map( (v)=>{return v.id} )
        setOrdersId(o);
    })

    let handleOrders = ( id )=>{
        console.log("order food trigerd");
        fetch("http://localhost:4000/items/"+id)
        .then((response)=>{return response.json() })
        .then((data)=>{
           let newOrders =  localStorage.getItem("orders");
           console.log(newOrders);
           newOrders = JSON.parse(newOrders);
           newOrders.push(data);
           newOrders = JSON.stringify(newOrders);
           localStorage.setItem("orders" , newOrders)
        })
    }

    let handleCancelOrders = ( id )=>{
        let olderOrders =  localStorage.getItem("orders");
        olderOrders = JSON.parse(olderOrders);
        let start = olderOrders.findIndex( (v)=>{ return v.id === id} )
        olderOrders.splice( start , 1 );
        olderOrders = JSON.stringify(olderOrders);
        localStorage.setItem("orders" , olderOrders);
    }


let handleDeleteFood=()=>
{
    fetch("http://localhost:4000/items/"+id,{method:"DELETE"})
    .then( ()=>{
        alert("food has been removed");
        history.push("/")
    } )
}


    return ( 
        <div>
           {error && <h1>{error}</h1> }
           {pending && <div className="loader"></div>  }
           {item && <div className="food-details">
                        <div className="food-details-temp">
                            <div className="food-details-img-div"><img src={item.pic} alt="food" /></div>
                            <div className="food-details-img-disc-container">
                                <div className="child">Food Name:</div>
                                <div className="child">{item.foodName}</div>
                                <div className="child">Price: </div>
                                <div className="child">{item.price}</div>
                                <div className="child">Rating:</div>
                                <div className="child"> {item.rating}</div>
                                <div className="child">category</div>
                                <div className="child"><span className={item.type==="Veg"? "Veg":"No-Veg" }>{item.type}</span></div>                                          
                            </div>
                            {/* <button>Order Now</button> */}
                            <div className="button">
                                {!ordersId.includes(item.id)   &&  <button onClick={()=>{handleOrders(item.id) }}>Order Now</button>   } <br />
                                {ordersId.includes(item.id)   && <button onClick={()=>{handleCancelOrders(item.id)}}>Canncel Order</button>}
                            </div>
                            <button onClick={handleDeleteFood}  >Remove Food</button>
                            <Link  to={`/updatefood${item.id}`}><button>Update Food</button></Link>
                        </div>
                    </div>
            }
        </div>
     );
}
 
export default Fooddetails;