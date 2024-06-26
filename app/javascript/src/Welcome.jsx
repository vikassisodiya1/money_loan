import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/authentication/PrivateRoute";
import ReactDOM from "react-dom";
import HomePage from "./components/home/Home";
import Register from "./components/authentication/Register";
import LogIn from "./components/authentication/LogIn";
import LoanForm from "./components/LoanForm";
import AdminLoanRequest from "./components/admin/AdminLoanRequest";

const Welcome = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/log_in" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new_loan" element={<PrivateRoute><LoanForm /></PrivateRoute>} />
          <Route path="/requests" element={<PrivateRoute><AdminLoanRequest /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Welcome />, document.getElementById("root"));
});

export default Welcome;
