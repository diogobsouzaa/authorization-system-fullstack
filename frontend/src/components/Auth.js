import React, {useState} from "react";

//componente de formulario
const AuthForm = ({buttonText, onSubmit}) =>{
    //estados para armazenar email e senha
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();//controlar o envio com js
        onSubmit({email, password});
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
                    onChange={(e) => setPassword(e.target.values)}
                />

            </div>

            <button type="submit">{buttonText}</button>
        </form> 

    );
};

export default AuthForm;