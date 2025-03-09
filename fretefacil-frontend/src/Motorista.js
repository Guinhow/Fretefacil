// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./motorista.css";

// const Motorista = () => {
//   const [solicitacoes, setSolicitacoes] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);

//   const accessToken = localStorage.getItem("access_token");

//   useEffect(() => {
//     axios
//       .get("http://192.168.0.237:8000/api/solicitacoes/", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//       .then((response) => {
//         const dados = Array.isArray(response.data)
//           ? response.data
//           : response.data.results || [];

//         // Aqui, não precisamos mais calcular a distância e o preço
//         const processadas = dados.map((solicitacao) => ({
//           ...solicitacao,
//           origem: solicitacao.origem_endereco || "Endereço não disponível",
//           destino: solicitacao.destino_endereco || "Endereço não disponível",
//         }));

//         setSolicitacoes(processadas);
//       })
//       .catch((error) => {
//         console.error("Erro ao buscar solicitações:", error);
//       });
//   }, [accessToken]);

//   const abrirModal = (solicitacao) => {
//     setSolicitacaoSelecionada(solicitacao);
//     setModalOpen(true);
//   };

//   const fecharModal = () => {
//     setModalOpen(false);
//     setSolicitacaoSelecionada(null);
//   };

//   return (
//     <div className="container">
//       <h1>Solicitações de Corrida</h1>
//       {solicitacoes.length === 0 ? (
//         <p>Nenhuma solicitação disponível.</p>
//       ) : (
//         <div className="grid">
//           {solicitacoes.map((solicitacao) => (
//             <div key={solicitacao.id} className="card" onClick={() => abrirModal(solicitacao)}>
//               <h3>{solicitacao.cliente_nome}</h3>
//               <p><strong>Distância:</strong> {solicitacao.distancia} km</p>
//               <p><strong>Valor:</strong> R$ {solicitacao.preco}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {modalOpen && solicitacaoSelecionada && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Detalhes da Solicitação</h2>
//             <p><strong>Cliente:</strong> {solicitacaoSelecionada.cliente_nome}</p>
//             <p><strong>Distância:</strong> {solicitacaoSelecionada.distancia} km</p>
//             <p><strong>Valor:</strong> R$ {solicitacaoSelecionada.preco}</p>
//             <p><strong>Origem:</strong> {solicitacaoSelecionada.origem}</p>
//             <p><strong>Destino:</strong> {solicitacaoSelecionada.destino}</p>
//             <button className="accept">Aceitar</button>
//             <button className="reject">Recusar</button>
//             <button className="close" onClick={fecharModal}>Fechar</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Motorista;

import { useEffect, useState } from "react";
import axios from "axios";
import "./motorista.css";

const Motorista = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("http://192.168.1.10:8000/api/solicitacoes/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        const dados = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        // Adiciona os dados de endereço diretamente no estado
        const processadas = dados.map((solicitacao) => ({
          ...solicitacao,
          origem: solicitacao.origem || "Endereço não disponível",
          destino: solicitacao.destino || "Endereço não disponível",
        }));

        setSolicitacoes(processadas);
      })
      .catch((error) => {
        console.error("Erro ao buscar solicitações:", error);
      });
  }, [accessToken]);

  const abrirModal = (solicitacao) => {
    setSolicitacaoSelecionada(solicitacao);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setSolicitacaoSelecionada(null);
  };

  return (
    <div className="container">
      <h1>Solicitações de Corrida</h1>
      {solicitacoes.length === 0 ? (
        <p>Nenhuma solicitação disponível.</p>
      ) : (
        <div className="grid">
          {solicitacoes.map((solicitacao) => (
            <div key={solicitacao.id} className="card" onClick={() => abrirModal(solicitacao)}>
              <h3>{solicitacao.cliente_nome}</h3>
              <p><strong>Distância:</strong> {solicitacao.distancia} km</p>
              <p><strong>Valor:</strong> R$ {solicitacao.valor}</p>
              <p><strong>Destino:</strong> {solicitacao.destino}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && solicitacaoSelecionada && (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalhes da Solicitação</h2>
            <p><strong>Cliente:</strong> {solicitacaoSelecionada.cliente_nome}</p>
            <p><strong>Distância:</strong> {solicitacaoSelecionada.distancia} km</p>
            <p><strong>Valor:</strong> R$ {solicitacaoSelecionada.valor}</p>
            <p><strong>Origem:</strong> {solicitacaoSelecionada.origem}</p>
            <p><strong>Destino:</strong> {solicitacaoSelecionada.destino}</p>
            <button className="accept">Aceitar</button>
            <button className="reject">Recusar</button>
            <button className="close" onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Motorista;
