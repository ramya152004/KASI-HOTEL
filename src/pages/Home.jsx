import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RestaurantCard from "../components/restaurant/RestaurantCard";
import categories from "../data/categories";

function Home() {
  var Rlist = useSelector((state) => state.Restaurant.restaurantList);
  var Plist = useSelector((state) => state.Product.productList);
  var [search, setSearch] = useState("");
  var [pureVeg, setPureVeg] = useState(false);
  var [topRated, setTopRated] = useState(false);

  // keep only the categories that have at least one dish
  var cats = categories.filter(
    (c) => Plist.filter((Pro) => Pro.categories.includes(c.name)).length > 0,
  );

  // a restaurant is shown if the search text is in its name, its cuisines or one of its dishes
  var shown = Rlist.filter((r) => {
    var text = search.toLowerCase();
    var inName = (r.name + " " + r.cuisines.join(" "))
      .toLowerCase()
      .includes(text);
    var inDishes =
      Plist.filter(
        (Pro) =>
          Pro.restaurantId == r.restaurantId &&
          Pro.productName.toLowerCase().includes(text),
      ).length > 0;
    return (
      (inName || inDishes) &&
      (!pureVeg || r.pureVeg) &&
      (!topRated || r.rating >= 4.5)
    );
  });

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-3">What would you like to eat?</h3>

      <div className="search-box mb-4">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for restaurants, cuisines or dishes..."
          aria-label="Search for restaurants, cuisines or dishes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="d-flex flex-nowrap gap-3 mb-4 overflow-auto pb-2">
        {cats.map((c) => (
          <Link key={c.name} to={"/category/" + c.name} className="cat-pill">
            <span className="emoji">{c.emoji}</span>
            {c.name}
          </Link>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Our Featured Restaurants</h5>
        <span className="text-muted small">{shown.length} restaurants</span>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className={"chip" + (pureVeg ? " on" : "")}
          onClick={() => setPureVeg(!pureVeg)}
        >
          Pure Veg
        </button>
        <button
          className={"chip" + (topRated ? " on" : "")}
          onClick={() => setTopRated(!topRated)}
        >
          Rating 4.5+
        </button>
      </div>

      {shown.length === 0 && (
        <p className="text-muted">No restaurants found.</p>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {shown.map((r) => (
          <div className="col" key={r.restaurantId}>
            <RestaurantCard restaurant={r} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
