const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTurma = async (req, res) => {
  const { numero, nome } = req.body;

  if (!numero || !nome) {
    return res.status(400).json({ error: 'Número e nome da turma são obrigatórios' });
  }

  try {
    const novaTurma = await prisma.turma.create({
      data: {
        numero: numero,
        nome: nome,
      },
    });
    res.status(201).json(novaTurma); 
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar turma', details: error.message });
  }
};

const read = async (req, res) => {
    try {
        const turmas = await prisma.turma.findMany(); 
        return res.status(200).json(turmas); 
    } catch (error) {

        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
 
        const turma = await prisma.turma.delete({
            where: { id: parseInt(req.params.id) }
        });

        return res.status(200).json(turma);
    } catch (error) {
       
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createTurma, read, remove };
