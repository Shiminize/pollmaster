import React, { useState } from 'react';

export const LoginForm = ({ onLogin, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-heading font-bold text-center mb-6 text-primary-800">Admin Login</h2>
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                    <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                    />
                </div>
                <button type="submit" className="btn-primary w-full">
                    Enter Dashboard
                </button>
            </form>
        </div>
    );
};
