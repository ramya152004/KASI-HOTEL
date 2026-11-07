import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// the bar at the bottom of the screen, only on phones (d-md-none hides it on big screens)
function BottomNav() {
  var cartitems = useSelector((state) => state.Cart.cartitems);
  var session = useSelector((state) => state.Auth.session);
  var count = cartitems.reduce((sum, obj) => sum + obj.quantity, 0);

  return (
    <nav className="bottom-nav d-md-none">
      <NavLink to="/home">
        <i className="fa-solid fa-house"></i>
        Home
      </NavLink>
      <NavLink to="/cart">
        <i className="fa-solid fa-cart-shopping"></i>
        Cart
        {count > 0 && (
          <span className="badge rounded-pill bg-danger bottom-badge">
            {count}
          </span>
        )}
      </NavLink>
      {session ? (
        <NavLink to={session.role === "admin" ? "/admin" : "/profile"}>
          <i className="fa-solid fa-user"></i>
          Account
        </NavLink>
      ) : (
        <NavLink to="/login">
          <i className="fa-solid fa-user"></i>
          Login
        </NavLink>
      )}
    </nav>
  );
}
export default BottomNav;
