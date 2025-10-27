import React from 'react';
import Sidebar from '../components/Sidebar';

const DashboardPage = ({ currentUser, adminData, handleLogout }) => {
    return (
        // React.Fragment
        <>
            <Sidebar handleLogout={handleLogout} currentUser={currentUser} />

            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <button 
                    className="navbar-toggler d-md-none collapsed" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#sidebarMenu" 
                    aria-controls="sidebarMenu"
                >
                   
                    <span className="navbar-toggler-icon"></span>
                </button>

                <button 
                    className="navbar-toggler d-none d-md-block" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#sidebarMenu" 
                    aria-controls="sidebarMenu"
                    style={{ marginLeft: '10px' }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a 
                            className="nav-link px-3" 
                            href="/" 
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogout();
                            }}
                        >
                            Sair
                        </a>
                    </div>
                </div>
            </header>

            {/* conteúdo principal */}
            <main className="container-fluid mt-4 text-center">
                {currentUser ? (
                    <h1>Bem-Vindo, {currentUser.full_name}!</h1>
                ) : (
                    <h1>Bem-Vindo, Carregando dados...</h1>
                )}

                <p className="lead">
                    Seu email é: {currentUser?.email} (Role: {currentUser?.role})
                </p>
                <p>Você está logado e seus dados foram carregados.</p>

                {/* painel de admin */}
                {adminData && (
                    <div className="alert alert-warning" role="alert">
                        <h4 className="alert-heading">Painel de Admin</h4>
                        <p>{adminData}</p>
                    </div>
                )}

            </main>
        </>
    );
};

export default DashboardPage;