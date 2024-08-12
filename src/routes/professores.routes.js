const {Router} = require('express')
const ProfessorController = require('../controllers/ProfessorController')


const professoresRoutes = new Router()

professoresRoutes.post('/', ProfessorController.criar)
professoresRoutes.get('/',  ProfessorController.listarPorParametro)
professoresRoutes.put('/:id', ProfessorController.atualizar)


module.exports = professoresRoutes