import React, { useState } from "react";
import AuthForm from "./components/Auth";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  const handleRegister = async (credentials) => {
    setMessage("Registrando...");
    try {
      // Garantimos que o objeto enviado tem as chaves 'email' e 'password'
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Falha no registro";
        if (data.detail) {
          if (Array.isArray(data.detail)) {
            errorMessage = data.detail.map(err => `${err.loc[1]}: ${err.msg}`).join('; ');
          } else {
            errorMessage = data.detail;
          }
        }
        throw new Error(errorMessage);
      }

      setMessage("Usuário registrado com sucesso! Faça o login.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogin = async (credentials) => {
    setMessage("Fazendo login...");
    try {
      // O endpoint /token espera dados de formulário, não JSON.
      const formData = new URLSearchParams();
      // O backend espera 'username' para o login, que no nosso caso é o email do usuário.
      formData.append("username", credentials.email);
      formData.append("password", credentials.password);
      
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Falha no login.");
      }
      setToken(data.access_token);
      setMessage(""); // Limpa a mensagem após o login bem-sucedido
      
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setMessage("Você foi desconectado");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Autenticação</h1>
        {message && <p>{message}</p>}
        {!token ? (
          <div className="auth-container">
            {/* O mesmo AuthForm é usado para ambos, passando a função correta */}
            <AuthForm buttonText="Cadastrar" onSubmit={handleRegister} />
            <AuthForm buttonText="Login" onSubmit={handleLogin} />
          </div>
        ) : (
          <div>
            <h2>Bem-vindo! Você está logado.</h2>
            <p>Seu token de acesso foi gerado.</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;