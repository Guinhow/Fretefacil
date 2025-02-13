import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

const Dashboard = () => {
  return (
    <div className='bodyngton'>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/solicitacoes">Ver Solicitações</Link></li>
          <li><Link to="/nova-solicitacao">Criar Nova Solicitação</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;