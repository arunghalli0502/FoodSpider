import { useEffect, useState } from "react";
import Foodlist from "./Foodlist";

const Orders  = () => {

let[orders, setOrders]  = useState(null);

useEffect(  ()=>{
    let foodOrderd= localStorage.getItem("orders")
    foodOrderd= JSON.parse(foodOrderd);
    console.log(foodOrderd);
    setOrders(foodOrderd);
    console.log(" Orders  "+orders);
} ,[])

    return (
        <div className="orders">
           {orders && <Foodlist items={orders} title="Orderd food "></Foodlist>}
        </div>
      );
}
 
export default Orders ;