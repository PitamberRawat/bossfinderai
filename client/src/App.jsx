import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Signin from "./components/Signin";
import Success from "./Success";
import Cancel from "./Cancel";
import CheckoutPage from "./components/CheckoutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/checkoutpage"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
};

export default App;
