import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DishCard from "../../components/dish/DishCard";
import { deletefromlist, resetproducts } from "../../store/slices/productSlice";
import { Toast, confirmDelete, confirmReset } from "../../utils/alerts";

function Dashboard() {
  var dispatch = useDispatch();
  var navigate = useNavigate();
  var Plist = useSelector((state) => state.Product.productList);
  var Rlist = useSelector((state) => state.Restaurant.restaurantList);
  var [search, setSearch] = useState("");
  var [restaurantId, setRestaurantId] = useState("All");

  var shown = Plist.filter(
    (Pro) =>
      Pro.productName.toLowerCase().includes(search.toLowerCase()) &&
      (restaurantId === "All" || Pro.restaurantId == restaurantId),
  );

  // ask first, then delete
  var deleteNow = (Pro) => {
    confirmDelete(Pro.productName).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletefromlist(Pro.productId));
        Toast.fire({ icon: "success", title: "Dish deleted" });
      }
    });
  };

  var resetNow = () => {
    confirmReset().then((result) => {
      if (result.isConfirmed) {
        dispatch(resetproducts());
        Toast.fire({ icon: "success", title: "Menu reset" });
      }
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h3 className="fw-bold mb-0">Manage dishes</h3>
          <span className="text-muted small">{shown.length} dishes</span>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin/add" className="btn btn-brand rounded-pill px-4">
            <i className="fa-solid fa-plus me-2"></i>
            Add dish
          </Link>
          <button
            className="btn btn-light border rounded-pill"
            onClick={resetNow}
          >
            Reset menu
          </button>
        </div>
      </div>

      <div className="row g-2 mb-4">
        <div className="col-md-8">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search dishes..."
              aria-label="Search dishes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-select h-100"
            aria-label="Filter by restaurant"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
          >
            <option value="All">All restaurants</option>
            {Rlist.map((r) => (
              <option key={r.restaurantId} value={r.restaurantId}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {shown.length === 0 && <p className="text-muted">No dishes found.</p>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {shown.map((Pro) => (
          <div className="col d-flex flex-column" key={Pro.productId}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted small">
                {Rlist.find((r) => r.restaurantId == Pro.restaurantId)?.name}
              </span>
            </div>
            <DishCard Pro={Pro} showRestaurant={true} />
            <div className="d-flex gap-2 mt-2">
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => navigate("/admin/edit/" + Pro.productId)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger w-100"
                onClick={() => deleteNow(Pro)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Dashboard;
