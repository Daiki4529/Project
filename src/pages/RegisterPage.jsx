import "react";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";

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
