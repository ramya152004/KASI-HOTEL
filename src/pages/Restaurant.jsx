import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DishCard from "../components/dish/DishCard";
// import VegChips from "../components/dish/VegChips";
import { fixImage } from "../utils/helpers";

function Restaurant() {
  var { rid } = useParams(); // the number in the address /restaurant/:rid
  var restaurant = useSelector((state) =>
    state.Restaurant.restaurantList.find((obj) => obj.restaurantId == rid),
  );
  var Plist = useSelector((state) => state.Product.productList);
  var [search, setSearch] = useState("");
  var [types] = useState([]); // empty = All
  var [category, setCategory] = useState("All");

  // wrong address, for example /restaurant/99
  if (!restaurant) {
    return (
      <div className="container py-5 text-center">
        <h4>Restaurant not found</h4>
        <Link to="/home" className="btn btn-brand rounded-pill px-4 mt-2">
          Back to restaurants
        </Link>
      </div>
    );
  }

  // only the dishes of this restaurant
  var dishes = Plist.filter((Pro) => Pro.restaurantId == rid);
  var categories = ["All", ...new Set(dishes.flatMap((Pro) => Pro.categories || []))];

  var shown = dishes.filter(
    (Pro) =>
      Pro.productName.toLowerCase().includes(search.toLowerCase()) &&
      (types.length === 0 || types.includes(Pro.foodType)) &&
      (category === "All" || Pro.categories.includes(category)),
  );

  return (
    <div className="container py-4">
      <div className="rest-hero mb-4">
        <img src={restaurant.image} alt={restaurant.name} onError={fixImage} />
        <div className="p-3 p-md-4">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <h3 className="fw-bold mb-1">{restaurant.name}</h3>
            <span className="rating-badge">
              <i className="fa-solid fa-star"></i> {restaurant.rating}
            </span>
          </div>
          <p className="text-muted mb-1">{restaurant.cuisines.join(", ")}</p>
          <p className="small text-muted mb-2">
            <i className="fa-solid fa-location-dot me-1"></i>
            {restaurant.address}
          </p>
          <div className="d-flex flex-wrap gap-2 small">
            <span className="badge bg-light text-dark border">
              {restaurant.deliveryTime}
            </span>
            <span className="badge bg-light text-dark border">
              ₹{restaurant.costForTwo} for two
            </span>
            <span className="badge bg-light text-dark border">
              Delivery ₹{restaurant.deliveryFee}, free above ₹
              {restaurant.freeDeliveryAbove}
            </span>
            <span className="badge bg-light text-dark border">
              Min order ₹{restaurant.minOrder}
            </span>
            {restaurant.pureVeg && (
              <span className="badge bg-success">Pure Veg</span>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-end mb-3">
        <h4 className="fw-bold mb-0">Menu</h4>
        <span className="text-muted small">{shown.length} dishes</span>
      </div>

      <div className="search-box mb-3">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for dishes..."
          aria-label="Search for dishes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="d-flex flex-nowrap gap-2 mb-3 overflow-auto">
        {categories.map((name) => (
          <button
            key={name}
            className={"chip text-nowrap" + (category === name ? " on" : "")}
            onClick={() => setCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {/*
      <VegChips types={types} setTypes={setTypes} /> */}

      {shown.length === 0 && <p className="text-muted">No dishes found.</p>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {shown.map((Pro) => (
          <div className="col" key={Pro.productId}>
            <DishCard Pro={Pro} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Restaurant;
