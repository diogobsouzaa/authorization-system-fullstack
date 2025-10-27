import React from 'react';

const DashboardPage = ({currentUser, adminData, handleLogout}) => {
    return (
        <div>
            {currentUser ? (
                <h2>Bem-Vindo, {currentUser.full_name} (Role: {currentUser.role})!</h2>
            ) : (
                <h2>Bem-Vindo, Carregando dados...</h2>
            )}
            <p>Você está logado e seus dados foram carregados</p>

            {adminData && (
                <div style={{ padding: '10px', border: '1px solid yellow', margin: '20px' }}>
                    <strong>Painel de Admin:</strong>
                    <p>{adminData}</p>
                </div>
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default DashboardPage;