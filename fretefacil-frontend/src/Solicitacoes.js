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
              <h3>Solicitação de {s.cliente_nome}</h3>
              <p>Origem: {s.origem}</p>
              <p>Destino: {s.destino}</p>
              <p>Distância: {s.distancia} km</p>
              <p>Valor: R${s.valor}</p>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Solicitacoes;

