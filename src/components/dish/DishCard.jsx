import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addtocart } from "../../store/slices/CartSlice";
import { Toast, showImage, showDetails } from "../../utils/alerts";
import { fixImage } from "../../utils/helpers";

var markColor = { veg: "#1E8E3E", egg: "#B26A00", nonveg: "#C62828" };
var markName = { veg: "Veg", egg: "Egg", nonveg: "Non-veg" };

// one dish. If showRestaurant is true, the restaurant name is shown (Category page)
function DishCard({ Pro, showRestaurant }) {
  var dispatch = useDispatch();
  var session = useSelector((state) => state.Auth.session);
  var isAdmin = session && session.role === "admin"; // the admin does not order

  // the restaurant that sells this dish
  var restaurant = useSelector((state) =>
    state.Restaurant.restaurantList.find(
      (obj) => obj.restaurantId == Pro.restaurantId,
    ),
  );

  // guests can add to the cart too. Login is asked at checkout
  var addNow = () => {
    dispatch(
      addtocart({
        productId: Pro.productId,
        productName: Pro.productName,
        productPrice: Pro.productPrice,
        productImage: Pro.productImage,
        restaurantId: Pro.restaurantId,
        quantity: 1,
      }),
    );
    Toast.fire({ icon: "success", title: Pro.productName + " added to cart" });
  };

  var viewDetails = () => {
    showDetails(Pro).then((result) => {
      if (result.isConfirmed) addNow();
    });
  };

  return (
    <div className="dish-card h-100">
      <button
        className="dish-img"
        onClick={() => showImage(Pro)}
        aria-label={"View photo of " + Pro.productName}
      >
        <img
          src={Pro.productImage}
          alt={Pro.productName}
          loading="lazy"
          onError={fixImage}
        />
      </button>
      <div className="dish-body">
        <div className="d-flex align-items-center gap-2">
          <span
            className="food-mark"
            role="img"
            aria-label={markName[Pro.foodType]}
            style={{ color: markColor[Pro.foodType] }}
          >
            <i></i>
          </span>
          <h6 className="mb-0 clamp1">{Pro.productName}</h6>
        </div>
        {showRestaurant && restaurant && (
          <Link
            to={"/restaurant/" + restaurant.restaurantId}
            className="small text-muted text-decoration-none"
          >
            <i className="fa-solid fa-shop me-1"></i>
            {restaurant.name}
          </Link>
        )}
        <p className="small text-muted clamp2 mb-2">{Pro.productDescription}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="price">₹{Pro.productPrice}</span>
          {!isAdmin && (
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-light border"
                onClick={viewDetails}
                aria-label={"Details of " + Pro.productName}
              >
                <i className="fa-solid fa-circle-info"></i>
              </button>
              <button
                className="btn btn-sm btn-brand rounded-pill px-3"
                onClick={addNow}
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default DishCard;
