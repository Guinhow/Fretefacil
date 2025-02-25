import React, { useState } from 'react';
import api from './Api';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('cliente');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
        username: username,
        password: password,
        user_type: userType,
      };
  
      try {
        const response = await api.post('register/', userData);
        console.log('Usuário criado com sucesso:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Erro no cadastro:', error.response);
      }
    };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuário:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <br />
        <label>
          Tipo de Conta:
          <select value={userType} onChange={e => setUserType(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="motorista">Motorista</option>
          </select>
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default SignUp;