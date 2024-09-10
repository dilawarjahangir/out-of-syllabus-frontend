import React, { useState, FormEvent } from 'react';
import Auth from '../core/Auth';

export const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        
        if (!email || !password) {
            setError('Email and Password are required');
            return;
        }

        try {
            const result = await Auth.login(email, password);

            if (result.success) {
                alert('Login successful!');
                // You can redirect the user or update the UI as needed
            } else {
                setError('Login failed: ' + result.message);
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
