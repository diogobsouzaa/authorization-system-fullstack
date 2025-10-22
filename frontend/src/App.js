import React, { useState, useEffect } from "react";
import AuthForm from "./components/Auth";
import "./App.css";

function App() {
  //dados do token
  //const [token, setToken] = useState(null);
  
  //dados do usuario logado
  const [currentUser, setCurrentUser] = useState(null);

  const [message, setMessage] = useState("");

  //dados da rota admin
  const[adminData, setAdminData] = useState(null);

  const [token, setToken] = useState (() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    //limpa url, token não fica visivel
    if (tokenFromUrl){
      window.history.pushState({}, document.title, "/");
    }
    return tokenFromUrl;
  });

  //hook useEffect busca dados do usuario quando o token mudar
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token){
        setCurrentUser(null);
        return;
      }
      try{
        //requisição para endpoint protegido
        const response = await fetch("http://localhost:8000/users/me", {
          method: "GET",
          headers: {
            //cabeçalho de autenticação
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok){
          throw new Error(data.detail || 'Não foi possivel buscar os dados do usúario.');
        }
        //se busca bem sucedida, armazena dados do usuario
        setCurrentUser(data)

        //buscar dados admin
        const adminResponse = await fetch("http://localhost:8000/admin/data", {
          method: "GET",
          headers:{"Authorization": `Bearer ${token}`},
        });

        if (adminResponse.ok){
          const data = await adminResponse.json();
          setAdminData(data.message);
        }else{
          setAdminData(null)
        }

      }catch (error){
        setMessage(error.message)
        setToken(null);
      }
    };
    fetchUserData();

  }, [token]); //roda sempre que o token mudar

  const handleRegister = async (credentials) => {
    setMessage("Registrando...");
    try {
      // garantindo que o objeto enviado tem as chaves 'email' e 'password'
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
            
            <AuthForm buttonText="Cadastrar" onSubmit={handleRegister} />
            <AuthForm buttonText="Login" onSubmit={handleLogin} />

            {/*BOTÃO DE LOGIN COM GOOGLE */}
            <div className="google-login">
              <p>Ou</p>
              <a href="http://localhost:8000/login/google" className="google-button">
              Login com Google
              </a>
            </div>
          </div>
        ) : (
          <div>
            {currentUser ? (
              //eximbindo email e role do usuario
              <h2>Bem-Vindo, {currentUser.email}! ({currentUser.role})</h2>
            ) : (
              <h2>Bem-Vindo, Carregando dados...</h2>

            )}
            <p>Você está logado e seus dados foram carregados</p>
            
            {/* renderização condicional da seção de admin */}
            {adminData && (
              <div style = {{padding: '10px', border: '1px solid yellow', margin: '20px'}}>
                <strong>Painel de Admin:</strong>
                <p>{adminData}</p>
              </div>
            )}

            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;