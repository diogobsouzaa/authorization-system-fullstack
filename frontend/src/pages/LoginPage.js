import React from 'react';
import AuthForm from '../components/Auth';
import { Link } from 'react-router-dom';

const LoginPage = ({handleLogin, message}) => {
    return (
        <div>
            <AuthForm 
                buttonText="Login" 
                onSubmit={handleLogin} 
            />
            {message && <p>{message}</p>}
            <p>Não tem uma conta? <Link to="/register">Cadastre-se aqui</Link></p>
            <div style={{marginTop: '20px'}}>
                <p>Ou faça login com:</p>
                <a 
                    href="http://localhost:8000/login/google" 
                    className="google-button"
                    style={{
                        display: 'inline-block',
                        backgroundColor: '#4285f4',
                        color: 'white',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    Google
                </a>
            </div>
        </div>
    );
};

export default LoginPage;