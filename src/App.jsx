import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar.jsx";
import StudentsPage from "./components/StudentPage.jsx";
import { auth } from "./firebase"; // Ensure auth is properly imported

const App = () => {
  const isAuthenticated = auth.currentUser; // Check if the user is authenticated

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={<Sidebar />}
        />
        <Route
          path="/students"
          element={<StudentsPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
