import L from 'leaflet';

export const calcularDistancia = (novaPosicao, outroPonto) => {
  if (
    novaPosicao &&
    novaPosicao.lat !== undefined &&
    novaPosicao.lng !== undefined &&
    outroPonto &&
    outroPonto.lat !== undefined &&
    outroPonto.lng !== undefined
  ) {
    const ponto1 = L.latLng(novaPosicao.lat, novaPosicao.lng);
    const ponto2 = L.latLng(outroPonto.lat, outroPonto.lng);
    const distanciaMetros = ponto1.distanceTo(ponto2);
    return (distanciaMetros / 1000).toFixed(2);  // Retorna em km com duas casas decimais
  }
  console.error("Erro: um ou ambos os pontos estão inválidos");
  return 0; // Se algum ponto for inválido, retorna 0
};