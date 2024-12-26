import 'react';
import Navbar from "../components/Navbar.jsx";
import LoginForm from "../components/LoginForm.jsx";

function LoginPage() {
    return (
        <div>
            <Navbar />
            <h1>Connexion</h1>
            <LoginForm />
        </div>
    );
}

export default LoginPage;
