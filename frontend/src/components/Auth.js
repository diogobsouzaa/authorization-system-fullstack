import React, { useState } from "react";

const AuthForm = ({ buttonText, onSubmit, isRegister = false }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const credentials = { email, password };
        if (isRegister) {
            credentials.full_name = fullName;
            credentials.date_of_birth = dob || null; 
        }
        onSubmit(credentials);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{buttonText}</h2>

            {isRegister && (
                <>
                    <div>
                        <label htmlFor="fullName">Nome Completo:</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dob">Data de Nascimento:</label>
                        <input
                            type="date"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                </>
            )}

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