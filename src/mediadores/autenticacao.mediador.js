const { TEMPO_LOGADO_EM_HORAS } = require("../constantes");

function diferencaoEmHoras(data1, data2) {
    const diferenca = data2 - data1;

    return parseInt(diferenca / (60 * 60 * 1000), 10);
}

module.exports = function(req, res, next) {
    const token = req.header('Authorization')
    const dataDoToken = token?.replace('Bearer ', '');
    if (!token || !Boolean(+dataDoToken)) {
        return res.status(401).send("Token inválido");
    }
    if (diferencaoEmHoras(dataDoToken, Date.now()) > TEMPO_LOGADO_EM_HORAS) {
        return res.status(401).send("Token informado está expirado");
    }
    next();
}