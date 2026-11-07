import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            <h5 className="text-white fw-bold">Sky Park Cafe</h5>
            <p className="small mb-0">
              Order food from your favourite restaurants. A demo project built
              with React, Redux Toolkit and React Router.
            </p>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="text-white">Explore</h6>
            <ul className="list-unstyled small mb-0">
              <li>
                <Link to="/home">Restaurants</Link>
              </li>
              <li>
                <Link to="/cart">My Cart</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <h6 className="text-white">Categories</h6>
            <ul className="list-unstyled small mb-0">
              <li>
                <Link to="/category/Biryanis">Biryanis</Link>
              </li>
              <li>
                <Link to="/category/Tiffins">Tiffins</Link>
              </li>
              <li>
                <Link to="/category/Beverages">Beverages</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="small mb-0">Demo only. No real orders or payments.</p>
      </div>
    </footer>
  );
}
export default Footer;
