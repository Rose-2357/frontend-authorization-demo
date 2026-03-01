import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import "./styles/App.css";
import ProtectedRoute from "./ProtectedRoute";
import { register } from "../utils/auth";

function App() {
  const [isLoggedin, setIsloggedin] = useState(false);

  const navigate = useNavigate();

  function handleRegistration({ username, email, password, confirmPassword }) {
    if (password === confirmPassword) {
      register(username, email, password)
        .then(() => {
          // TODO
          navigate("/login");
        })
        .catch(console.error);
    }
  }

  return (
    <Routes>
      <Route
        path="/ducks"
        element={
          <ProtectedRoute isLoggedin={isLoggedin}>
            <Ducks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <ProtectedRoute isLoggedin={isLoggedin}>
            <MyProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <div className="loginContainer">
            <Login />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="registerContainer">
            <Register handleRegistration={handleRegistration} />
          </div>
        }
      />
      <Route
        path="*"
        element={
          isLoggedin ? (
            <Navigate to="/ducks" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
