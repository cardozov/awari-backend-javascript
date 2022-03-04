const axios = require('axios');

async function enderecoPorCep(cep) {
    const result = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    return result?.data;
}

async function calculaFrete(cepDestino) {
    const cepDaLoja = '01001001'
    const url = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&nCdServico=41106&sCepOrigem=${cepDaLoja}&sCepDestino=${cepDestino}&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nVlDiametro=0&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`;
    const result = await axios.post(url, {});

    return result?.data;
}

module.exports = {
    enderecoPorCep,
    calculaFrete
}