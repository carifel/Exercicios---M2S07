const {Router} = require('express')
const CursoController = require('../controllers/CursoController')

const cursosRoutes = new Router()

cursosRoutes.post('/', CursoController.criar)
cursosRoutes.get('/',  CursoController.listaTodos)
cursosRoutes.get('/',  CursoController.listarPorParametro)
cursosRoutes.put('/:id', CursoController.atualizar)


module.exports = cursosRoutes