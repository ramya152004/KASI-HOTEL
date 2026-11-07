import { Link } from "react-router-dom";
import { fixImage } from "../../utils/helpers";

// one restaurant on the Home page. Click it to open the Restaurant page
function RestaurantCard({ restaurant }) {
  return (
    <Link to={"/restaurant/" + restaurant.restaurantId} className="rest-card">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        loading="lazy"
        onError={fixImage}
      />
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h6 className="mb-1 clamp1">{restaurant.name}</h6>
          <span className="rating-badge">
            <i className="fa-solid fa-star"></i> {restaurant.rating}
          </span>
        </div>
        <p className="small text-muted mb-1 clamp1">
          {restaurant.cuisines.join(", ")}
        </p>
        <p className="small text-muted mb-0">
          {restaurant.area} · {restaurant.deliveryTime} · ₹
          {restaurant.costForTwo} for two
        </p>
        {restaurant.pureVeg && (
          <span className="badge bg-success mt-2">Pure Veg</span>
        )}
      </div>
    </Link>
  );
}
export default RestaurantCard;
