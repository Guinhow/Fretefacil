import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route , Link } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Solicitacoes from './Solicitacoes';
import NovaSolicitacao from './NovaSolicitacao';
import PrivateRoute from './PrivateRoute';
import ContactForm from './Contactform';


function App() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);
  const subMenu = [
    { name: 'Nova Solicitação', path: '/nova-solicitacao' },
    { name: 'Solicitações', path: '/solicitacoes' },
    { name: 'Configurações', path: '/dashboard' },
    { name: 'Fale Conosco', path: '/Contact' },
    { name: 'Sair', path: '/' },
  ];

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };


  useEffect(() => {
    axios.get('http://localhost:8000/api/solicitacoes/')
      .then(response => {
        setSolicitacoes(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar solicitações:", error);
      });
  }, []);

  return (
    
    <Router>
       <div className='header'>
          <button className="menu-toggle" onClick={toggleMenu}>☰</button>
          <button className="menu-toggle" onClick={toggleMenu}>☰</button>
          <nav className={`navbar ${menuAberto ? 'ativo' : ''}`}>
            <ul className="lista">
              {subMenu.map((x) => (<li className='itens' key={x.name}>
                <Link to={x.path} className='menu-link' onClick={fecharMenu}>{x.name}</Link>
              </li>))}
            </ul>
          </nav>
        </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/solicitacoes" element={<Solicitacoes />} />
          <Route path="/nova-solicitacao" element={<NovaSolicitacao />} />
          <Route path="/Contact" element={<ContactForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;