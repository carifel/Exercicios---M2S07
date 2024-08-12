const Professor = require('../models/Professor')

class ProfessorController{
    async criar(request, response) {
        try {
            const dados = request.body

            if(!dados.nome || !dados.curso_id){
                return response
                    .status(400)
                    .json({mensagem: "Nome do professor e o id do curso são obrigatórios."})               
            }
                const professor = await Professor.create(dados)
                response.status(201).json(professor)

            }catch (error) {
            response
                .status(500)
                .json({mensagem: 'Houve um erro ao criar o cadastro do professor'})
        }
    }

    async listarPorParametro(request, response) {
        try {
            const { curso_id } = request.query

            const professores = await Professor.findAll({
                where: {
                    curso_id: curso_id
                }
            })

            response.json(professores)

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao listar o professor'
            })
        }
    }
    
    async atualizar(request, response) {
        try {
            const id = request.params.id
            const dados = request.body
            
            if (!dados.nome || !dados.curso_id) {
                return response
                    .status(400)
                    .json({ mensagem: 'O nome do professor e o id do curso são obrigatórios' })
            }
          
            const professor = await Professor.findByPk(id)

            if (!professor) {
                response
                    .status(404)
                    .json({ mensagem: 'O professor não foi encontrado' })
            }

            professor.nome = dados.nome
            professor.duracao = dados.curso_id
            await professor.save()

            response.json(professor)

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao atualizar os dados do professor'
            })
        }
    }

    async deletar(request, response) {
        try {
            const id = request.params.id
            const professor = await Professor.findByPk(id)

            if (!professor) {
                response
                    .status(404)
                    .json({ mensagem: 'O professor não foi encontrado!' })
            }

            await professor.destroy()

            response.status(204).json()

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao deletar o professor'
            })
        }
    }
}