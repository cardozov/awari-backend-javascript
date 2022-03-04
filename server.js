
const http = require('http');
const url = require('url');

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

const app = http.createServer(function (request, response) {
    if (request.url.startsWith('/frete')) {
        const parametrosQuery = url.parse(request.url, true).query;
        const { cidade, estado } = parametrosQuery;
        try {
            const valor = calculaFrete(cidade, estado);
            const CASAS_DECIMAIS = 2;
            const valorFormatado = valor.toFixed(CASAS_DECIMAIS).toString().replace('.',',');
            response.end(`O valor do frete é R$${valorFormatado}`);
        } catch (erro) {
            response.end('Cidade e/ou Estado inválidos');
        }
    }
    else {
        response.end('Esta URL não faz parte da nossa API');
    }

})
app.listen(3000, function() {
    console.log('Server running at http://localhost:3000/');
});