import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ handleLogout, currentUser }) => {
    return (

        <div 
            className="offcanvas offcanvas-start text-bg-dark" 
            tabIndex="-1" 
            id="sidebarMenu" 
            aria-labelledby="sidebarMenuLabel"
        >

            {/* cabeçalho do offcanvas*/}
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="sidebarMenuLabel">Meu Painel</h5>
                <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    data-bs-dismiss="offcanvas" 
                    aria-label="Close">
                </button>
            </div>

            {/* corpo do offcanvas */}
            <div className="offcanvas-body d-flex flex-column">
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link active" aria-current="page">
                            Início
                        </Link>
                    </li>
                </ul>

                <hr />

                {/* menu de usuário com o JS do bootstrap */}
                <div className="dropdown">
                    {currentUser && (
                        <span 
                            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" 
                            style={{ cursor: 'pointer' }} 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                            <img 
                                src={`https://ui-avatars.com/api/?name=${currentUser.full_name.replace(' ', '+')}&background=0D6EFD&color=fff`} 
                                alt="" width="32" height="32" className="rounded-circle me-2" 
                            />
                            <strong>{currentUser.full_name}</strong>
                        </span>
                    )}
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li>
                            <a 
                                className="dropdown-item" 
                                href="/" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
                            >
                                Sair
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;