import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import resList from "../utils/mockData";
import Shimmer from "./Shimmer";
const Body = () => {

    const [listOfRestaurants , setListOfRestaurant] = useState([]);
    const[searchText,setsearchText] = useState("");

   useEffect (()=> {
     fetchData();
   },[]);
        
   const fetchData = async () => {
    const data = await fetch (
"https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7076743&lng=77.0972752&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setListOfRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    
   };
      
  //  if(listOfRestaurants.length === 0){   conditional  rendering 
  //   return <Shimmer/> 
  //  }
     return listOfRestaurants.length===0 ?<Shimmer/> :
        (

      <div className="body">
       
        <div className="filter">
        <div className="search"> 
        <input type="text" className="search-box" value={searchText}/>
        <button onClick={()=> {

        }}>Search</button>
        </div>
            <button className="filter-btn" onClick={ () =>{
                const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4
                );
                setListOfRestaurant(filteredList);
                }
                }>Top Rated Restaurants</button>



        </div>
        <div className="res-container">
        {
          listOfRestaurants.map( (restaurant) => 
          <RestaurantCard  key={restaurant.info.id}  resData = {restaurant}/>)
        }
        </div>
      </div>
    );
  };


  export default Body ;