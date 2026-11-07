import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import AddDish from "./pages/admin/AddDish";
import EditDish from "./pages/admin/EditDish";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* pages without Navbar / Footer */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* pages with Navbar, Footer and BottomNav (Layout shows them) */}
        <Route element={<Layout />}>
          {/* everyone */}
          <Route path="/home" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/restaurant/:rid" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />

          {/* logged in customers only */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* admin only */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
          <Route
            path="/admin/add"
            element={
              <AdminRoute>
                <AddDish />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit/:pid"
            element={
              <AdminRoute>
                <EditDish />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
