const express = require('express');
const router = express.Router();
const User = require('./controller/user');
const Tarefa = require('./controller/tarefa');
const Turma = require('./controller/turma');

router.get('/logout', User.logout); 
router.post('/login', User.login);  
router.post('/cadastrar', User.cadastrarUsuario);  

router.post('/tarefa', Tarefa.create);
router.get('/tarefa', Tarefa.read);
router.delete('/tarefa/:id', Tarefa.remove);

router.post('/turma', Turma.createTurma);
router.get('/turma', Turma.read);
router.delete('/turma', Turma.remove);

module.exports = router;
