import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Bem-vindo ao Sistema</h1>
            <p>Por favor, faça o login ou cadastre-se para continuar.</p>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/register">Cadastrar</Link>
        </div>
    );
};

export default HomePage;