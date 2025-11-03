import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import GetInvolved from "./pages/GetInvolved";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Donate from "./pages/Donate";
import JoinEvent from "./pages/JoinEvent";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";

import { AuthProvider, useAuth } from "./context/AuthContext";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideLayout = ["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" />;

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/join-event" element={<JoinEvent />} />
            <Route path="/join-event/:id" element={<JoinEvent />} />
            <Route path="/donate/:id" element={<Donate />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly>
                  <AdminPanel />
                </PrivateRoute>
              }
            /> */}

            {/* <Route
              path="/donate"
              element={
                <PrivateRoute>
                  <Donate />
                </PrivateRoute>
              }   
            /> */}

            {/* <Route path="/join-event" element={<PrivateRoute><JoinEvent /></PrivateRoute>} />
            <Route
              path="/join-event/:id"
              element={
                <PrivateRoute>
                  <JoinEvent />
                </PrivateRoute>
              }
            /> */}


            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
