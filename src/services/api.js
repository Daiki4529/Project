// Fonction de connexion
export async function login(username, password) {
    try {
        const response = await fetch('http://fauques.freeboxos.fr:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Stockage du token (ou d'autres informations de session)
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

// Fonction d'inscription
export async function register(username, password) {
    try {
        const response = await fetch('http://fauques.freeboxos.fr:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

// Fonction de déconnexion
export function logout() {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
}