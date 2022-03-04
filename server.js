
const estadosComFreteDefinido = {
    'SP': 5,
    'RJ': 6.5,
    'MG': 7.2,
    'PR': 8,
    'DF': 25.5,
    'AM': 23.5,
    'AC': 23.5,
    'RO': 22,
    'RR': 22
};
const regiaoPorEstado = {
    'RO': 'Norte',
    'AC': 'Norte',
    'AM': 'Norte',
    'RR': 'Norte',
    'PA': 'Norte',
    'AP': 'Norte',
    'TO': 'Norte',
    'MA': 'Nordeste',
    'PI': 'Nordeste',
    'CE': 'Nordeste',
    'RN': 'Nordeste',
    'PB': 'Nordeste',
    'PE': 'Nordeste',
    'AL': 'Nordeste',
    'SE': 'Nordeste',
    'BA': 'Nordeste',
    'MG': 'Sudeste',
    'ES': 'Sudeste',
    'RJ': 'Sudeste',
    'SP': 'Sudeste',
    'PR': 'Sul',
    'SC': 'Sul',
    'RS': 'Sul',
    'MS': 'Centro Oeste',
    'MT': 'Centro Oeste',
    'GO': 'Centro Oeste',
    'DF': 'Centro Oeste',
};
const precoPorRegiao = {
    'Sul': 10,
    'Sudeste': 8,
    'Centro Oeste': 11.5,
    'Nordeste': 15,
    'Norte': 20,
};

function calculaFrete(cidade, estado) {
    if (cidade === 'São Paulo') {
        return 0 // Frete Grátis
    }

    if (estadosComFreteDefinido[estado]) {
        return estadosComFreteDefinido[estado];
    }

    const regiao = regiaoPorEstado[estado];
    return precoPorRegiao[regiao];
}