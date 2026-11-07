import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

// every page inside this layout gets the Navbar on top, the Footer and the BottomNav.
// <Outlet /> is the place where the page itself is shown (like your Dashboard).
function Layout() {
  return (
    <div className="has-bottom-nav">
      <Navbar />
      <Outlet />
      <Footer />
      <BottomNav />
    </div>
  );
}
export default Layout;
