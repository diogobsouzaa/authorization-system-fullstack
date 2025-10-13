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

import React, {useState, useEffect} from "react";
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

export default App;