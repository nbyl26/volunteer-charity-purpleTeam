import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import GetInvolved from "./pages/GetInvolved";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"
import Donate from "./pages/Donate";
import JoinEvent from "./pages/JoinEvent";
import Dashboard from "./pages/Dashboard";

import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EventsPage from "./pages/Admin/EventsPage";
import CampaignsPage from "./pages/Admin/CampaignsPage";
import UsersPage from "./pages/Admin/UsersPage";
import DonationsPage from "./pages/Admin/DonationsPage";
import AnalyticsPage from "./pages/Admin/AnalyticsPage";
import EventRegistrations from "./pages/Admin/EventRegistrations";
import VolunteersPage from "./pages/Admin/VolunteersPage";

import { AuthProvider, useAuth } from "./context/AuthContext";

import { Toaster } from "react-hot-toast";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideLayoutPaths = ["/login", "/register", "/forgot-password"];
  const isAuthPage = hideLayoutPaths.includes(location.pathname);
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAuthPage || isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/" />;

  return children;
}

function AuthRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <AuthRoute>
                  <ForgotPassword />
                </AuthRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <AuthRoute>
                  <ResetPassword />
                </AuthRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/donate"
              element={
                <PrivateRoute>
                  <Donate />
                </PrivateRoute>
              }
            />
            <Route
              path="/donate/:id"
              element={
                <PrivateRoute>
                  <Donate />
                </PrivateRoute>
              }
            />
            <Route
              path="/join-event"
              element={
                <PrivateRoute>
                  <JoinEvent />
                </PrivateRoute>
              }
            />
            <Route
              path="/join-event/:id"
              element={
                <PrivateRoute>
                  <JoinEvent />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="volunteers" element={<VolunteersPage />} />
              <Route path="events/:eventId/registrations" element={<EventRegistrations />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="donations" element={<DonationsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
            </Route>

            {/* Default Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </LayoutWrapper>
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;