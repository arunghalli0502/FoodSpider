import Foodlist from "./Foodlist";
import useFetch from "../Custome Hook/useFetch";
const Home = () => {

  let{data:items, pending, error}=useFetch("http://localhost:4000/items")
    
    return ( 
        <>
        <div className="home">
            {error && <h1>{error}</h1>}
            {pending && <div className="loader"></div>  }
            {items && <Foodlist items={items} title="All Food"/>}
            {items &&  <Foodlist items={items.filter( (food)=>{return (food.type==="Veg")} )} title="Veg Food"/>}
            {items &&  <Foodlist items={items.filter( (food)=>{return (food.type==="Non-Veg")} )} title="Non-Veg Food"/>}
        </div>
        </>        
     );
}
 
export default Home;