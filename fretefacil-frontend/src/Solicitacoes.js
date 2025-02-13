import React, { useEffect, useState } from 'react';
import api from './Api';

function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    api.get('solicitacoes/')
      .then(response => {
        setSolicitacoes(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar solicitações:", error);
      });
  }, []);

  return (
    <div>
      <h2>Solicitações de Serviço</h2>
      <ul>
        {solicitacoes.map(s => (
          <li key={s.id}>
            {s.origem} para {s.destino} na data {s.data}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Solicitacoes;
