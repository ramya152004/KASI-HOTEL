import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// Pages inside are only for the admin
function AdminRoute({ children }) {
  var session = useSelector((state) => state.Auth.session);
  var location = useLocation();

  if (!session) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, message: "Admin login required" }}
      />
    );
  }
  if (session.role !== "admin") {
    return <Navigate to="/home" replace />;
  }
  return children;
}
export default AdminRoute;
