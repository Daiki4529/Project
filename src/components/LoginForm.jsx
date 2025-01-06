import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({
        username: username,
        password: password,
      });
      navigate("/matches");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleLogin}>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
          className="input"
        />
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="input"
        />
        <Button
          text="Connexion"
          onClick={handleLogin}
          className="btn-primary"
          type="submit"
        />
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
export default LoginForm;
