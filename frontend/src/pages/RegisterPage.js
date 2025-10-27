import React from 'react';
import AuthForm from '../components/Auth';
import { Link } from 'react-router-dom';

const RegisterPage = ({handleRegister, message}) => {
    return (

        <div>
            <AuthForm 
                buttonText="Cadastrar" 
                onSubmit={handleRegister} 
                isRegister={true} // Diz ao formulário para mostrar os campos extras
            />
            {message && <p>{message}</p>}
            <p>Já tem uma conta? <Link to="/login">Faça o login aqui</Link></p>
        </div>
    );
};

export default RegisterPage;