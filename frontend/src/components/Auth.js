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
        <form onSubmit={handleSubmit} className="form-signin w-100 m-auto">
            <h1 className="h3 mb-3 fw-normal">{buttonText}</h1>

            {isRegister && (
                <>
                    <div className="form-floating">
                    
                        <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder = "Nome Completo"
                        />
                        <label htmlFor="fullName">Nome Completo</label>
                    </div>
                    <div className="form-floating">
                        
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                        <label htmlFor="dob">Data de Nascimento</label>
                    </div>
                </>
            )}

            <div className="form-floating">
                
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="nome@exemplo.com"
                />
                <label htmlFor="email">Email:</label>
            </div>

            <div className="form-floating">
                
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Senha"
                />
                <label htmlFor="password">Senha:</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">{buttonText}</button>
        </form>
    );
};

export default AuthForm;