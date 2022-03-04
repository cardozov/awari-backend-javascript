
const http = require('http');
const https = require('https');

function calculaFrete(cepDestino, response) {
    const cepDaLoja = '01001001';
    const dadosDeEnvio = JSON.stringify({});
    const opcoes = {
        hostname: 'ws.correios.com.br',
        port: '80',
        path: `/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&nCdServico=41106&sCepOrigem=${cepDaLoja}&sCepDestino=${cepDestino}&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nVlDiametro=0&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dadosDeEnvio.length
        }
    };
    const req = http.request(opcoes, function(res) {
        const dados = []
        res.on('data', function(pedaco) {
            dados.push(pedaco);
        })
        res.on('end', function() {
            const retorno = Buffer.concat(dados);
            response.writeHead(200, {'Content-Type': 'application/xml'}).end(retorno);
        })
    });
    req.on('error', function(erro) {
        console.log(erro)
    });
    req.write(dadosDeEnvio);
    req.end();
}

function enderecoPorCep(cep, response) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const req = https.get(url, function (res) {
        const dados = [];
        res.on('data', function (chunk) {
            dados.push(chunk);
        });
        res.on('end', function () {
            const retorno = Buffer.concat(dados).toString();
            response.writeHead(200, {
                'Content-Length': Buffer.byteLength(retorno),
                'Content-Type': 'application/json'
            }).end(retorno);
        });
    });
    req.on('error', function (erro) {
        console.log(erro);
    });
}

const app = http.createServer(function (request, response) {
    if (request.url.startsWith('/frete')) {
        const [, , cepDestino] = request.url.split('/');
        calculaFrete(cepDestino, response);
    }
    else if (request.url.startsWith('/endereco')) {
        const [, , cep] = request.url.split('/');
        enderecoPorCep(cep, response);
    }
    else {
        response.end('Esta URL não faz parte da nossa API');
    }

})
app.listen(3000, function() {
    console.log('Server running at http://localhost:3000/');
});