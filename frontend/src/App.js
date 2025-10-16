/*import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Autenticação</h1>
        <p>A mensagem do backend aparecerá aqui.</p>
      </header>
    </div>
  );
}

export default App;*/
//////////////////////////////////////
/*import React, {useState, useEffect} from "react";
import './App.css';


function App(){
  const[message, setMessage] = useState("Carregando...");

  useEffect(() => {

    fetch("http://127.0.0.1:8000/").then(response => response.json())
      .then(data => {

        setMessage(data.message);

      }).catch(error => {

        console.error("Erro ao buscar dados:", error);
        setMessage("Falha ao carregar dados do backend.");

      });

  }, []);

  return (

    <div className="App">

      <header className="App-header">

        <h1>Sistema de Autenticação</h1>

        <p>{message}</p>

      </header>

    </div>

  );

}

export default App;*/

import React, { useState } from "react";
import AuthForm from "./components/Auth";
import "./App.css";

function App(){
  //usuario logado, armazenando token
  const [token, setToken] = useState(null);
  const[message , setMessage] = useState("");

  const handleRegister = async(credentials) => {
    console.log("Tentando registrar com:", credentials);
    setMessage("Registrando...");
    //////////
  };

  const handleLogin = async (credentials) => {
    console.log("Tentando logar com:", credentials);
    setMessage("Fazendo login...");
    //////////
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
        {/* Renderização Condicional: */}
        {/* se não houver token*/}
        
        {!token ?(

          <div className="auth-container">
            <AuthForm buttonText = "Cadastrar" onSubmit={handleRegister} />
            <AuthForm buttonText="Login" onSubmit={handleLogin} />
          </div>

        ) : (

          // se houver token
          <div>
            <h2>Bem-vindo! Você está logado.</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>

        )}
        
      </header>
    </div>

  );

}

export default App;