import React, { useState, useEffect } from "react";
//import AuthForm from "./components/Auth";
import "./App.css";

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

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

  const navigate = useNavigate();

  //token vindo da url - Google login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      //window.history.pushState({}, document.title, "/dashboard"); // Redireciona para o dashboard
    }
  }, []);

  //hook useEffect busca dados do usuario quando o token mudar
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token){
        setCurrentUser(null);
        setAdminData(null);
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
        body: JSON.stringify(credentials),
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
      navigate('/login');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogin = async (credentials) => {
    setMessage("Fazendo login...");
    try {
      // O endpoint /token espera dados de formulário, não JSON.
      const formData = new URLSearchParams();
      // O backend espera 'username' para o login, é o email do usuário.
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
      setMessage(""); // limpa a mensagem após o login bem-sucedido
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    setAdminData(null)
    setMessage("Você foi desconectado");
    navigate('/');
  };

  return (
    <div className="App">
      <header className="App-header">
        {message && <p style = {{color: 'yellow'}}>{message}</p>}
        <Routes>
          {/* rota 1: Página Inicial */}
          <Route path="/" element={!token ? <HomePage /> : <Navigate to="/dashboard" />} />

          {/* rota 2: Página de Login */}
          <Route path="/login" element={!token ? <LoginPage handleLogin={handleLogin} message={message} /> : <Navigate to="/dashboard" />} />

          {/* rota 3: Página de Cadastro */}
          <Route path="/register" element={!token ? <RegisterPage handleRegister={handleRegister} message={message} /> : <Navigate to="/dashboard" />} />

          {/* rota 4: Painel (Protegida) */}
          <Route 
            path="/dashboard" 
            element={
              token ? 
              <DashboardPage currentUser={currentUser} adminData={adminData} handleLogout={handleLogout} /> : 
              <Navigate to="/login" />
            } 
          />

          {/*rota fallback para paginas não encontradas*/}
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;