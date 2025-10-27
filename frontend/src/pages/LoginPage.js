import React from 'react';
import AuthForm from '../components/Auth';
import { Link } from 'react-router-dom';

const LoginPage = ({handleLogin, message}) => {
    return (
        <div className='form-container'>
            <AuthForm 
                buttonText="Login" 
                onSubmit={handleLogin} 
            />
            {message && <p className="mt-3 text-warning">{message}</p>}
            <p className="mt-3">Não tem uma conta? <Link to="/register">Cadastre-se aqui</Link></p>
            <div style={{ marginTop: '20px' }} className="text-center">
                <p>Ou faça login com:</p>
                <a 
                    href="http://localhost:8000/login/google" 
                    className='btn btn-primary'
                >
                    Google
                </a>
            </div>

            <div className="mt-4">
                <Link to="/" className="btn btn-outline-secondary btn-sm">
                    Voltar à Página Inicial
                </Link>
            </div>

        </div>
    );
};

export default LoginPage;