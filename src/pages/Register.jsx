import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/authSlice";
import { Toast } from "../utils/alerts";
import { validateRegister } from "../utils/validators";

// one entry for each input box
var fields = [
  { name: "name", label: "Full name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Mobile number", type: "tel" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirm", label: "Confirm password", type: "password" },
];

function Register() {
  var dispatch = useDispatch();
  var navigate = useNavigate();
  var location = useLocation();
  var session = useSelector((state) => state.Auth.session);

  var [alreadyIn] = useState(session !== null);
  var [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  var [errors, setErrors] = useState({});
  var [message, setMessage] = useState("");
  var [loading, setLoading] = useState(false);

  var from = (location.state && location.state.from) || "/home";
  var info = location.state && location.state.message;

  if (alreadyIn) {
    return (
      <Navigate to={session.role === "admin" ? "/admin" : "/home"} replace />
    );
  }

  // the name of the input (name, email...) is the key to change in the form
  var handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  var handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    var errs = validateRegister(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await dispatch(registerUser(form)).unwrap();
      Toast.fire({ icon: "success", title: "Account created. Welcome!" });
      navigate(from, { replace: true });
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
        <h3 className="fw-bold text-center mb-4">Create your account</h3>

        {info && <div className="alert alert-info py-2">{info}</div>}
        {message && <div className="alert alert-danger py-2">{message}</div>}

        {fields.map((f) => (
          <div className="mb-3" key={f.name}>
            <label htmlFor={f.name} className="form-label">
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              className={"form-control" + (errors[f.name] ? " is-invalid" : "")}
              value={form[f.name]}
              onChange={handleChange}
            />
            {errors[f.name] && (
              <div className="text-danger small">{errors[f.name]}</div>
            )}
          </div>
        ))}

        <button
          className="btn btn-brand w-100 btn-lg mt-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Sign up"}
        </button>

        <div className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" state={location.state} className="text-brand">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Register;
