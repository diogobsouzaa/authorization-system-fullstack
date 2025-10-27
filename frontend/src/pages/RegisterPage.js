import React from 'react';
import AuthForm from '../components/Auth';
import { Link } from 'react-router-dom';

const RegisterPage = ({handleRegister, message}) => {
    return (

        <div className="form-container">
            <AuthForm 
                buttonText="Cadastre-se" 
                onSubmit={handleRegister} 
                isRegister={true} // Diz ao formulário para mostrar os campos extras
            />
    
            
            <p className="mt-3">Já tem uma conta? <Link to="/login">Faça o login aqui</Link></p>
            
            <div className="mt-4">
                <Link to="/" className="btn btn-outline-secondary btn-sm">
                    Voltar à Página Inicial
                </Link>
            </div>
        
        
        </div>
    );
};

export default RegisterPage;