import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="container py-5 text-center">
        <h1 className="fw-bold">404</h1>
        <p className="text-muted">This page does not exist.</p>
        <Link to="/home" className="btn btn-brand rounded-pill px-4">
          Back to menu
        </Link>
      </div>
    </>
  );
}
export default NotFound;
