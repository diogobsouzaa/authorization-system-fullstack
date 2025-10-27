import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="p-5 mb-4 bg-light rounded-3 text-center">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Bem-vindo.</h1>
                    <p className="fs-4">
                      Este é um projeto Full Stack completo de autenticação.
                    </p>

                    <p className='lead'>Por favor, faça o login ou cadastre-se para continuar.</p>

                    <div className='mt-4'>
                        <Link to="/login" className="btn btn-primary btn-lg me-2" role="button">
                        Login
                        </Link>
                        <Link to="/register" className="btn btn-secondary btn-lg" role="button">
                        Cadastrar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;


