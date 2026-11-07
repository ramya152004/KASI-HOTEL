import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DishCard from "../components/dish/DishCard";
import VegChips from "../components/dish/VegChips";
import categories from "../data/categories";

function Category() {
  var { name } = useParams(); // for example Biryanis, from /category/Biryanis
  var Plist = useSelector((state) => state.Product.productList);
  var [search, setSearch] = useState("");
  var [types, setTypes] = useState([]); // empty = All

  // the emoji of this category (undefined if the name is wrong)
  var cat = categories.find((c) => c.name == name);

  // dishes of this category from ALL restaurants
  var shown = Plist.filter(
    (Pro) =>
      Pro.categories.includes(name) &&
      Pro.productName.toLowerCase().includes(search.toLowerCase()) &&
      (types.length === 0 || types.includes(Pro.foodType)),
  );

  return (
    <div className="container py-4">
      <Link to="/home" className="small text-muted text-decoration-none">
        <i className="fa-solid fa-arrow-left me-1"></i>
        All restaurants
      </Link>

      <div className="d-flex justify-content-between align-items-end my-3">
        <h3 className="fw-bold mb-0">
          {cat ? cat.emoji + " " : ""}
          {name}
        </h3>
        <span className="text-muted small">{shown.length} dishes</span>
      </div>

      <div className="search-box mb-3">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder={"Search in " + name + "..."}
          aria-label="Search for dishes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <VegChips types={types} setTypes={setTypes} />

      {shown.length === 0 && <p className="text-muted">No dishes found.</p>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {shown.map((Pro) => (
          <div className="col" key={Pro.productId}>
            <DishCard Pro={Pro} showRestaurant={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Category;
