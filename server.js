function calculaFrete(endereco, produto) {
    const texto = `
        Olá, boas vindas à nossa Loja.
        Já recebemos as informações e iremos mandar o produto ${produto} para ${endereco}
    `;
    console.log(texto);
}

calculaFrete('Fortaleza - CE', 'Camiseta da Awari')