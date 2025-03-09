import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import SignUp from './SignUp';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://192.168.1.10:8000/api/token/', { username, password })
      .then(response => {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user_type', response.data.user_type);
        if (response.data.user_type === "motorista") {
          navigate('/motorista'); 
        } else {
          navigate('/nova-solicitacao'); 
        }
      })
      .catch(error => {
        console.error("Erro ao fazer login:", error);
      });
  };

  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('http://192.168.0.237:8000/api/token/', { username, password })
  //     .then(response => {
  //       localStorage.setItem('access_token', response.data.access);
  //       localStorage.setItem('refresh_token', response.data.refresh);
  //       navigate('/nova-solicitacao'); 
  //     })
  //     .catch(error => {
  //       console.error("Erro ao fazer login:", error);
  //     });
  // };
  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div id="login-box">
      <h1>App Frete Fácil</h1>
      <h2>Bem vindo ao nosso app de fretes</h2>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="user-box">
        <label>Usuário:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="user-box">
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="buttons-login">
        <button type="submit" className="login-button">
          Login<span></span>
        </button>

        <button type="button" className="login-button" onClick={handleSignup}>
          Sign-up<span></span>
        </button>
      </div>
    </form>
  </div>
);
};

export default Login;