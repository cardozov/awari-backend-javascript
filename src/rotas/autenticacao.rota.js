const crypto = require('crypto');

const Acesso = require('../modelos/autenticacao.modelo');

async function verificaAcesso(usuario, senha) {
    if (! await usuarioJaCadastrado(usuario)) {
        return false;
    }
    const acesso = await Acesso.findOne({ usuario })
    const senhasBatem = acesso.senha === geraHashDeSenha(usuario, senha);

    return senhasBatem;
}

async function usuarioJaCadastrado(usuario) {
    const acesso = await Acesso.findOne({ usuario });

    return Boolean(acesso);
}

/**
 * Senha deve conter ao menos 6 caracteres com, pelo menos, 1 número
 * Nome de Usuário deve ter 3 caracteres no mínimo
 */
function validaUsuarioESenha(usuario, senha) {
    if (usuario.length < 2) {
        return false;
    }
    if (senha.length < 5 || !senha.match(/\d/g)) {
        return false;
    }

    return true;
}

function geraHashDeSenha(usuario, senha) {
    const chave = process.env.CHAVE_DE_SENHA || '';
    const hash = crypto.createHash('md5').update(senha+usuario+chave).digest('hex');

    return hash;
}

module.exports = function(app) {
    app.route('/autenticacao/entrar').post(async (req, res) => {
        const { usuario, senha } = req.body
        if (!await verificaAcesso(usuario, senha)) {
            return res.status(400).send('Usuário ou senha inválidos');
        }

        return res.status(200).json({ token: Date.now() });
    })

    app.route('/autenticacao/cadastro').post(async (req, res) => {
        const { usuario, senha } = req.body
        if (await usuarioJaCadastrado(usuario)) {
            return res.status(400).send('Usuário já foi cadastrado');
        }
        if (!validaUsuarioESenha(usuario, senha)) {
            return res.status(400).send('Usuário ou senha inválidos');
        }
        const hashDeSenha = geraHashDeSenha(usuario, senha);
        const id = Date.now();
        try {
            await new Acesso({ id, usuario, senha: hashDeSenha }).save();
            return res.status(200).json({ token: id });
        } catch (erro) {
            console.err(erro);
            return res.status(500).json({ message: 'Ocorreu algum comportamento inesperado' });
        }
    })
}