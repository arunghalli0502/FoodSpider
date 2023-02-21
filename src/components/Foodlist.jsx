import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
const Foodlist = ({items, title}) => {

   let history= useHistory()
    
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
    history.push("/");

}
    return ( 
        <>
         <h1>{title}</h1>
         <div className="food-list">
         {
            items.map((food)=>{
                return(
                    <>
                        <div className="food" key={food.id}>
                            <Link to={`/fooddetails${food.id}`}>
                                <img src={food.pic} alt="" />  
                                <div className="FNP">
                                    <h2>{food.foodName}</h2>
                                    <h4>Rs. {food.price}</h4>
                                    {/* <h4>Rs. {food.id}</h4> */}
                                    
                                </div>                         
                            </Link>
                            <div className="orderbutton">
                                {!ordersId.includes(food.id)   &&  <button onClick={()=>{handleOrders(food.id) }}>Order Now</button>   } <br />
                                {ordersId.includes(food.id)   && <button onClick={()=>{handleCancelOrders(food.id)}}>Canncel Order</button>}
                            </div>
                            
                        </div>
                   </>
                )
            } )
         }
       </div>
        </>
     );
}
 
export default Foodlist ;