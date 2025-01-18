import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      const userData = data.user._json;
      const currDate = Math.floor(Date.now() / 1000);
      setUser({...userData, createdAt: currDate });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route
          exact
          path="/profile"
          element={user ? <Home user={user} /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
