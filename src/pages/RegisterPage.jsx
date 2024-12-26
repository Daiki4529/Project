import 'react';
import Navbar from "../components/Navbar.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

function RegisterPage() {
    return (
        <div>
            <Navbar />
            <h1>Inscription</h1>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;
