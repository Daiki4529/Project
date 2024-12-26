import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from './Button';
import '../App.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-logo">Chifoumi</Link>
                <div className="navbar-links">
                    {isLoggedIn ? (
                        <Button
                            text="Déconnexion"
                            onClick={handleLogout}
                            className="navbar-link"
                        />
                    ) : (
                        <>
                            <Button
                                text="Connexion"
                                onClick={() => navigate('/login')}
                                className="navbar-link"
                            />
                            <Button
                                text="Inscription"
                                onClick={() => navigate('/register')}
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