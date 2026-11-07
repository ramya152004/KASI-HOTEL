import { useNavigate } from "react-router-dom";

function Landing() {
  var navigateTo = useNavigate();

  return (
    <div className="landing">
      <div className="landing-card">
        <div className="logo-circle">
          <i className="fa-solid fa-utensils"></i>
        </div>
        <h2 className="fw-bold mb-4">KASI HOTEL</h2>
        <button
          className="btn btn-brand btn-lg"
          onClick={() => navigateTo("/home")}
        >
          View Menu <i className="fa-solid fa-arrow-right ms-2"></i>
        </button>
      </div>
    </div>
  );
}
export default Landing;
