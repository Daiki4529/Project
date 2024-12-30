import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MatchesPage from "./pages/MatchesPage.jsx";
import { AuthProvider } from "./auth/AuthProvider";
import Navbar from "./components/Navbar.jsx";
import {MatchProvider} from "../context/MatchProvider.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/matches"
            element={
              <MatchProvider>
                <MatchesPage />
              </MatchProvider>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
