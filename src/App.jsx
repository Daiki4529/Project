import { AuthProvider } from "./context/AuthProvider.jsx";
import { MatchProvider } from "./context/MatchProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MatchListPage from "./pages/MatchListPage.jsx";
import MatchPage from "./pages/MatchPage.jsx";
import "./App.css";

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
            <Route path="/matches" element={<MatchListPage />} />
            <Route path="/matches/:matchId" element={<MatchPage />} />
          </Routes>
        </Router>
      </MatchProvider>
    </AuthProvider>
  );
}

export default App;
