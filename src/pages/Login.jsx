import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/authSlice";
import { Toast, askSaveLogin } from "../utils/alerts";
import { validateLogin } from "../utils/validators";

function Login() {
  var dispatch = useDispatch();
  var navigate = useNavigate();
  var location = useLocation();
  var session = useSelector((state) => state.Auth.session);

  // remember if the person was already logged in when this page opened
  var [alreadyIn] = useState(session !== null);
  var [email, setEmail] = useState(localStorage.getItem("savedEmail") || "");
  var [password, setPassword] = useState("");
  var [errors, setErrors] = useState({});
  var [message, setMessage] = useState("");
  var [loading, setLoading] = useState(false);

  // the page to open after login (a guest who pressed "Place order" comes back to /cart)
  var from = (location.state && location.state.from) || "/home";
  var info = location.state && location.state.message;

  if (alreadyIn) {
    return (
      <Navigate to={session.role === "admin" ? "/admin" : "/home"} replace />
    );
  }

  var handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    var errs = validateLogin({ email: email, password: password });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      // unwrap() gives the user, or throws the message sent by rejectWithValue
      var user = await dispatch(
        loginUser({ email: email, password: password }),
      ).unwrap();

      // dialog with three buttons: Save / Don't save / Cancel
      var result = await askSaveLogin();
      if (result.isConfirmed) {
        localStorage.setItem("savedEmail", email.trim().toLowerCase());
        Toast.fire({ icon: "success", title: "Login saved" });
      } else if (result.isDenied) {
        localStorage.removeItem("savedEmail");
        Toast.fire({ icon: "info", title: "Login not saved" });
      }
      navigate(user.role === "admin" ? "/admin" : from, { replace: true });
    } catch (err) {
      setMessage(err.message || err);
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <div className="logo-circle small-logo">
          <i className="fa-solid fa-utensils"></i>
        </div>
        <h3 className="fw-bold text-center mb-4">Welcome back</h3>

        {info && <div className="alert alert-info py-2">{info}</div>}
        {message && <div className="alert alert-danger py-2">{message}</div>}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={"form-control" + (errors.email ? " is-invalid" : "")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className="text-danger small">{errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={"form-control" + (errors.password ? " is-invalid" : "")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="text-danger small">{errors.password}</div>
          )}
        </div>

        <button
          className="btn btn-brand w-100 btn-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <div className="text-center mt-3">
          New here?{" "}
          <Link to="/register" state={location.state} className="text-brand">
            Create an account
          </Link>
        </div>
        {/* <div className="text-center mt-2">
          <Link to="/home" className="text-brand">
            Back to menu
          </Link>
        </div> */}
      </form>
    </div>
  );
}
export default Login;
