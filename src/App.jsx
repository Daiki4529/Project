import "./App.css";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MatchesPage from "./pages/MatchesPage.jsx";
import {AuthContext, AuthProvider} from "./context/AuthProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import { MatchProvider } from "./context/MatchProvider.jsx";
import Match from "./pages/Match.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <MatchProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/matches"
              element={
                <ProtectedRoute>
                  <MatchesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/matches/:matchId"
              element={
                <ProtectedRoute>
                  <Match />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </MatchProvider>
    </AuthProvider>
  );
}

export default App;
