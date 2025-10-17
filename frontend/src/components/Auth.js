import React, { useState } from "react";

const AuthForm = ({ buttonText, onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ email, password });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{buttonText}</h2>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />
            </div>

            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default AuthForm;