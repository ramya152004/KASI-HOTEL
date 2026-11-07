import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartRow from "../components/cart/CartRow";
import { clearcart, removefromcart } from "../store/slices/CartSlice";
import {
  Alert,
  Toast,
  askLoginOrSignup,
  confirmOrder,
  confirmRemove,
} from "../utils/alerts";

function Cart() {
  var dispatch = useDispatch();
  var navigate = useNavigate();
  var cartitems = useSelector((state) => state.Cart.cartitems);
  var session = useSelector((state) => state.Auth.session); // who is logged in (null = guest)
  var count = cartitems.reduce((sum, obj) => sum + obj.quantity, 0);
  var total = cartitems.reduce(
    (sum, obj) => sum + obj.productPrice * obj.quantity,
    0,
  );

  var removeNow = (item) => {
    confirmRemove(item.productName).then((result) => {
      if (result.isConfirmed) {
        dispatch(removefromcart(item.productId));
        Toast.fire({ icon: "success", title: "Removed from cart" });
      } else {
        Toast.fire({ icon: "info", title: "Your item is safe" });
      }
    });
  };

  var placeOrder = () => {
    // login is kept in Redux (state.Auth.session), not in localStorage "isLoggedin"
    if (!session) {
      askLoginOrSignup(navigate, "/cart");
      return;
    }
    if (session.role === "admin") {
      Toast.fire({ icon: "info", title: "Admin accounts cannot place orders" });
      return;
    }
    confirmOrder(total).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearcart());
        Alert.fire({
          icon: "success",
          title: "Order placed!",
          text: "Thank you. Your food will be ready soon.",
        }).then(() => navigate("/home"));
      }
    });
  };

  return (
    <>
      <div className="container py-4">
        <h3 className="fw-bold mb-4">My Cart</h3>

        {cartitems.length === 0 ? (
          <div className="empty-cart text-center">
            <i className="fa-solid fa-cart-shopping"></i>
            <h5 className="mt-3">Your cart is empty</h5>
            <p className="text-muted">Add some tasty dishes from the menu.</p>
            <button
              className="btn btn-brand rounded-pill px-4"
              onClick={() => navigate("/home")}
            >
              Browse menu
            </button>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              {cartitems.map((item) => (
                <CartRow
                  key={item.productId}
                  item={item}
                  onRemove={removeNow}
                />
              ))}
            </div>

            <div className="col-lg-4">
              <div className="summary">
                <h5 className="fw-bold mb-3">Order summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Items</span>
                  <span>{count}</span>
                </div>
                <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button
                  className="btn btn-brand w-100 btn-lg"
                  onClick={placeOrder}
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Cart;
