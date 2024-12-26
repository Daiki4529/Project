import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api.js';
import Button from "./Button.jsx";
import Input from "./Input.jsx";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await register(username, password);
            console.log('Registration successful:', data);
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleRegister}>
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
                    text="Inscription"
                    onClick={handleRegister}
                    className="btn-primary"
                    type="submit"
                />
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default RegisterForm;