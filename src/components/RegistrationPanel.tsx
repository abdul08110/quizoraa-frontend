import React, { useState } from 'react';

const RegistrationPanel: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !email) {
            setError('Please fill in all fields.');
            return;
        }
        // Handle registration logic here
        console.log('Registered:', { name, email });
        setName('');
        setEmail('');
        setError('');
    };

    return (
        <div className="registration-panel">
            <h2>Register for the Contest</h2>
            {error && <p className="error">{error}</p>}
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button className="register-btn" type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationPanel;