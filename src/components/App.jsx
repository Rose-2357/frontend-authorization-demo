import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import "./styles/App.css";
import ProtectedRoute from "./ProtectedRoute";
import { authorize, register } from "../utils/auth";

function App() {
  const [isLoggedin, setIsloggedin] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "" });

  const navigate = useNavigate();

  function handleRegistration({ username, email, password, confirmPassword }) {
    if (password === confirmPassword) {
      register(username, email, password)
        .then(() => {
          navigate("/login");
        })
        .catch(console.error);
    }
  }

  function handleLogin({ username, password }) {
    if (!username || !password) {
      return;
    }

    console.log(password);

    authorize(username, password)
      .then((data) => {
        if (data.jwt) {
          setIsloggedin(true);
          setUserData(data.user);
          navigate("/ducks");
        }
      })
      .catch(console.error);
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
            <MyProfile userData={userData} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <div className="loginContainer">
            <Login handleLogin={handleLogin} />
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
