# Sistema de Autenticação e Painel de Usuário (Full-Stack)

Um sistema de autenticação completo e seguro, construído do zero com Python, FastAPI, React, PostgreSQL e Docker. Este projeto implementa autenticação JWT, login social com Google (OAuth2), controle de acesso baseado em roles (RBAC) e um painel de usuário responsivo.

## Stack de Tecnologias

O projeto é containerizado com Docker e dividido em três serviços principais: Backend, Frontend e Banco de Dados.

<div>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/SQLAlchemy-4E4E4E?style=for-the-badge&logo=sqlalchemy&logoColor=white" alt="SQLAlchemy" />
  <img src="https://img.shields.io/badge/Alembic-9C4B3D?style=for-the-badge&logo=alembic&logoColor=white" alt="Alembic" />
  <img src="https://img.shields.io/badge/pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white" alt="Pydantic" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</div>

| Área | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Backend** | FastAPI | Framework da API, roteamento e lógica de negócios. |
| | SQLAlchemy | ORM para comunicação com o PostgreSQL. |
| | Alembic | Gerenciamento de migrações do schema do banco. |
| | Pydantic | Validação de dados de entrada e saída. |
| | python-jose & Passlib | Geração/validação de tokens JWT e hashing de senhas. |
| | Authlib | Gerenciamento do fluxo complexo do Google OAuth2. |
| -- | -- | -- |
| **Frontend** | React (Hooks) | Construção da interface de usuário reativa. |
| | React Router 6 | Roteamento de páginas (Login, Cadastro, Dashboard). |
| | Bootstrap 5 | Design responsivo, layout e componentes visuais (Forms, Navbar, Offcanvas). |
| -- | -- | -- |
| **Banco de Dados** | PostgreSQL | Armazenamento relacional dos dados de usuários. |
| -- | -- | -- |
| **Infraestrutura** | Docker & Docker Compose | Containerização e orquestração de todos os serviços. |


---

## Demonstração (Showcase)

| Página de Login |

| ![Página de Login](https://github.com/user-attachments/assets/0139048f-5ea3-4788-89e5-71df376206a0) | 

| Página de Cadastro |

![Página de Cadastro](https://github.com/user-attachments/assets/80bb7bb1-98ea-4645-a74d-42ea45b1e4b5) | 

| Painel do Usuário (Dashboard) |

![Painel do Usuário](https://github.com/user-attachments/assets/0027572c-7297-4bce-8d77-811964f5917b) |

---

## Funcionalidades Implementadas

* **Autenticação Segura (JWT):** Sistema de cadastro e login com email e senha. As senhas são hasheadas (bcrypt) e a sessão é gerenciada por JSON Web Tokens (access tokens).  
  
* **Login Social (Google OAuth2):** Fluxo completo de autenticação de terceiros. O usuário pode se cadastrar/logar com sua conta do Google, e o sistema cria ou vincula a conta automaticamente.
* **Controle de Acesso Baseado em Roles (RBAC):**
    * Usuários possuem roles (ex: `user` e `admin`).
    * Endpoints de API (ex: `/admin/data`) são protegidos por dependências, garantindo que apenas usuários com o role `admin` possam acessá-los.
* **Painel de Usuário Protegido:**
    * O acesso ao dashboard (`/dashboard`) é protegido; usuários não logados são redirecionados para a página de login.
    * O painel exibe dados do usuário (nome, email, role) obtidos do endpoint protegido `/users/me`.
* **Interface Responsiva:** O design se adapta a diferentes tamanhos de tela, utilizando um menu "Offcanvas" colapsável no painel do usuário.
* **Evolução de Banco de Dados:** O `Alembic` é usado para gerenciar as migrações do banco. Adições de novas colunas (como `full_name`, `date_of_birth`, `role`) são feitas de forma segura sem perda de dados.

---

## Pré-requisitos
* [Docker](https://www.docker.com/products/docker-desktop/) e [Docker Compose](https://docs.docker.com/compose/) instalados.
* Credenciais do **Google Cloud** (Client ID e Client Secret) para o OAuth2.

## Configure as Variáveis de Ambiente
*Este projeto usa um arquivo .env para gerenciar API keys e etc. Um template .env.example é fornecido.

*Renomeie o arquivo env.example para .env e mude as variaveis
