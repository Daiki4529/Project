import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Button from "./Button";
import "../App.css";
import { AuthContext } from "../auth/AuthProvider";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {}, [token]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          Chifoumi
        </Link>
        <div className="navbar-links">
          {token ? (
            <>
              <Button
                text="Matches"
                onClick={() => navigate("/matches")}
                className="navbar-link"
              />
              <Button
                text="Déconnexion"
                onClick={handleLogout}
                className="navbar-link"
              />
            </>
          ) : (
            <>
              <Button
                text="Connexion"
                onClick={() => navigate("/login")}
                className="navbar-link"
              />
              <Button
                text="Inscription"
                onClick={() => navigate("/register")}
                className="navbar-link"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
