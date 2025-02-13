// import React, { useState } from 'react';
// import api from './Api';
// import { useNavigate , Link } from 'react-router-dom';

// function NovaSolicitacao() {
//   const [origem, setOrigem] = useState('');
//   const [destino, setDestino] = useState('');
//   const [data, setData] = useState('');
//   const [hora, setHora] = useState('');
//   const [descricao, setDescricao] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     api.post('solicitacoes/', {
//       origem,
//       destino,
//       data,
//       hora,
//       descricao,
//     })
//     .then(response => {
//       navigate('/solicitacoes');
//     })
//     .catch(error => {
//       console.error("Erro ao criar solicitação:", error);
//     });
//   };

//   return (
//     <div>
//     <div className='solicitaform'></div>
//       <h2>Nova Solicitação de Serviço</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Origem:
//           <input type="text" value={origem} onChange={e => setOrigem(e.target.value)} required />
//         </label>
//         <br />
//         <label>
//           Destino:
//           <input type="text" value={destino} onChange={e => setDestino(e.target.value)} required />
//         </label>
//         <br />
//         <label>
//           Data:
//           <input type="date" value={data} onChange={e => setData(e.target.value)} required />
//         </label>
//         <br />
//         <label>
//           Hora:
//           <input type="time" value={hora} onChange={e => setHora(e.target.value)} required />
//         </label>
//         <br />
//         <label>
//           Descrição:
//           <textarea value={descricao} onChange={e => setDescricao(e.target.value)} />
//         </label>
//         <br />
//         <button type="submit">Criar Solicitação</button>
//       </form>
//     </div>
//   );
// }

// export default NovaSolicitacao;


import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from './Api';
import { useNavigate } from 'react-router-dom';
import './NovaSolicitacao.css'

// ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

//  coordenadas em endereço 
const fetchAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    const address = data.address;
    const rua = address.road || address.pedestrian || '';
    const cidade = address.city || address.town || address.village || '';
    const bairro = address.suburb || '';
    const formattedAddress = [rua, bairro, cidade].filter(Boolean).join(', ');
    
    return formattedAddress;
  } catch (error) {
    console.error('Erro ao converter coordenadas em endereço:', error);
    return '';
  }
};
// cliques no mapa para selecionar localização
const MapSelector = ({ selectMode, onLocationSelected }) => {
  useMapEvents({
    click: async (e) => {
      const address = await fetchAddressFromCoordinates(e.latlng.lat, e.latlng.lng);
      onLocationSelected(e.latlng, address, selectMode);
    },
  });
  return null;
};

function NovaSolicitacao() {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [descricao, setDescricao] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [markerOrigin, setMarkerOrigin] = useState(null);
  const [markerDestination, setMarkerDestination] = useState(null);
  
  // posição atual do usuário 
  const [currentPosition, setCurrentPosition] = useState([ -22.925867, -43.011017 ]); //home
  const [selectMode, setSelectMode] = useState('origin'); 
  const navigate = useNavigate();

  // localização atual do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    }
  }, []);

  // atualiza origem ou destino 
  const handleLocationSelected = (latlng, address, mode) => {
    if (mode === 'origin') {
      setMarkerOrigin(latlng);
      setOrigem(address);
    } else {
      setMarkerDestination(latlng);
      setDestino(address);
    }
  };

  // ajuste da posição do marcador
  const handleDragEnd = async (e, mode) => {
    const marker = e.target;
    const position = marker.getLatLng();
    const address = await fetchAddressFromCoordinates(position.lat, position.lng);
    if (mode === 'origin') {
      setMarkerOrigin(position);
      setOrigem(address);
    } else {
      setMarkerDestination(position);
      setDestino(address);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('solicitacoes/', {
      origem,    
      destino,   
      data,
      hora,
      descricao,
    })
    .then(response => {
      navigate('/solicitacoes');
    })
    .catch(error => {
      console.error("Erro ao criar solicitação:", error.response.data);
    });
  };

  return (
    <div className='corpo'>
      <MapContainer className='mapcontainer' center={currentPosition} zoom={13} >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MapSelector selectMode={selectMode} onLocationSelected={handleLocationSelected} />
        {markerOrigin && (
          <Marker
            position={markerOrigin}
            draggable={true}
            eventHandlers={{
              dragend: (e) => handleDragEnd(e, 'origin'),
            }}
          />
        )}
        {markerDestination && (
          <Marker
            position={markerDestination}
            draggable={true}
            eventHandlers={{
              dragend: (e) => handleDragEnd(e, 'destination'),
            }}
          />
        )}
      </MapContainer>
      <div className='boxdestination'>
        <div className='boxorigem' >
          <label><strong>Origem:</strong></label>
          <input
            onClick={() => setSelectMode('origin')}
            type="text"
            value={origem}
            readOnly
            placeholder="Clique no mapa para selecionar a origem"
          />
        </div>
        <div className='boxdestino'>
          <label><strong>Destino:</strong></label>
          <input
            onClick={() => setSelectMode('destination')}
            type="text"
            value={destino}
            readOnly
            placeholder="Clique no mapa para selecionar o destino"
          />
        </div>
        {/* <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <button type="button" onClick={() => setSelectMode('origin')} style={{ marginRight: '10px' }}>
            Selecionar Origem
          </button>
          <button type="button" onClick={() => setSelectMode('destination')}>
            Selecionar Destino
          </button>
        </div> */}
      </div>
      <div className='boxsolicitacao'>
        <h2>Nova Solicitação de Serviço</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Data:
            <input type="date" value={data} onChange={e => setData(e.target.value)} required />
          </label>
          <br />
          <label>
            Hora:
            <input type="time" value={hora} onChange={e => setHora(e.target.value)} required />
          </label>
          <br />
          <label>
            Descrição:
            <textarea value={descricao} onChange={e => setDescricao(e.target.value)} />
          </label>
          <br />
          <button type="submit">Criar Solicitação</button>
        </form>
      </div>
    </div>
  );
}

export default NovaSolicitacao;
