import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// Pages inside are only for logged in customers.
// A guest goes to /login and comes back to this page after the login.
function ProtectedRoute({ children }) {
  var session = useSelector((state) => state.Auth.session);
  var location = useLocation();

  if (!session) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, message: "Please login to continue" }}
      />
    );
  }
  if (session.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
export default ProtectedRoute;
