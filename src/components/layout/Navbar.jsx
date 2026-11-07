import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "../../store/slices/authSlice";
import { confirmLogout } from "../../utils/alerts";

function Navbar() {
  var dispatch = useDispatch();
  var navigate = useNavigate();
  var cartitems = useSelector((state) => state.Cart.cartitems);
  var session = useSelector((state) => state.Auth.session);
  var count = cartitems.reduce((sum, obj) => sum + obj.quantity, 0);

  var logout = () => {
    confirmLogout().then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutuser());
        navigate("/");
      }
    });
  };

  return (
    <nav className="topbar">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/home" className="brand d-flex align-items-center gap-2">
          <span className="brand-logo">
            <i className="fa-solid fa-utensils"></i>
          </span>
          <span className="brand-name">KASI HOTEL</span>
        </Link>

        <div className="d-flex align-items-center gap-2">
          <Link
            to="/cart"
            className="btn btn-light border rounded-pill position-relative"
            aria-label={"Cart, " + count + " items"}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="d-none d-sm-inline ms-2">Cart</span>
            {count > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {count}
              </span>
            )}
          </Link>

          {session ? (
            <>
              <Link
                to={session.role === "admin" ? "/admin" : "/profile"}
                className="btn btn-light border rounded-pill"
              >
                <i className="fa-solid fa-user"></i>
                <span className="d-none d-sm-inline ms-2">
                  {session.name.split(" ")[0]}
                </span>
              </Link>
              <button
                className="btn btn-outline-brand rounded-pill"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-brand rounded-pill">
                Login
              </Link>
              <Link to="/register" className="btn btn-brand rounded-pill">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
