const express = require('express');

module.exports = {
    setupTeste: rota => {
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        rota(app);
        return app;
    },
    freteXml: `
        <?xml version="1.0" encoding="ISO-8859-1" ?>
        <Servicos>
            <cServico>
                <Codigo>41106</Codigo>
                <Valor>21,00</Valor>
                <PrazoEntrega>5</PrazoEntrega>
                <ValorSemAdicionais>21,00</ValorSemAdicionais>
                <ValorMaoPropria>0,00</ValorMaoPropria>
                <ValorAvisoRecebimento>0,00</ValorAvisoRecebimento>
                <ValorValorDeclarado>0,00</ValorValorDeclarado>
                <EntregaDomiciliar>S</EntregaDomiciliar>
                <EntregaSabado>N</EntregaSabado>
                <obsFim></obsFim>
                <Erro>0</Erro>
                <MsgErro></MsgErro>
            </cServico>
        </Servicos>`,
    enderecoJson: {
        "bairro": "Sé",
        "cep": "01001-001",
        "complemento": "lado par",
        "ddd": "11",
        "gia": "1004",
        "ibge": "3550308",
        "localidade": "São Paulo",
        "logradouro": "Praça da Sé",
        "siafi": "7107",
        "uf": "SP"
    }
}