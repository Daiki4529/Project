import "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

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
