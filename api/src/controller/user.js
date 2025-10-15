const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuario && usuario.senha === senha) {
  
      return res.status(200).json({ message: 'Login bem-sucedido' });
    } else {

      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }
  } catch (error) {
   
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

async function cadastrarUsuario(req, res) {
  const { email, senha, nome } = req.body;

  try {
 
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já está em uso' });
    }

    await prisma.usuario.create({
      data: {
        email: email,
        senha: senha,
        nome: nome,
      },
    });

    console.log(`Usuário ${email} cadastrado com sucesso.`);
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
}

function logout(req, res) {
    req.session.destroy(err => {
        if (err) console.error("Erro ao destruir sessão:", err);
        res.redirect('/'); 
    });
}

module.exports = {
    login,
    logout,
    cadastrarUsuario 
};