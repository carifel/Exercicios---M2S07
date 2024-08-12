const Curso = require("../models/Curso")

class CursoController {

    async criar(request, response) {
        try {
            const dados = request.body

            if(!dados.nome || !dados.duracao){
                return response
                    .status(400)
                    .json({mensagem: "Nome do curso e sua duração são obrigatórios."})               
            }
                const curso = await Curso.create(dados)
                response.status(201).json(curso)

            }catch (error) {
            response
                .status(500)
                .json({mensagem: 'Houve um erro ao cadastrar o curso'})
        }
    }

    async listaTodos(request, response){
        try{
            const cursos = await Curso.findAll({
                attributes: [
                    ['id', 'identificador',
                    'nome',
                    'duracao'
                    ]  
                ],
                order: [['identificador', 'ASC']]
            })
            response.json(cursos)

        }catch(error){
            response
            .status(500)
            .json({mensagem: 'Houve um erro ao listar os cursos'}) 
        }
    }

    async listarPorParametro(request, response) {
        try {
            const { nome, duracao } = request.query

            const cursos = await Curso.findAll({
                where: {
                    nome: nome,
                    duracao: duracao
                }
            })

            response.json(cursos)

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao listar os cursos'
            })
        }
    }
    async atualizar(request, response) {
        try {
            const id = request.params.id
            const dados = request.body
            
            if (!dados.nome || !dados.duracao) {
                return response
                    .status(400)
                    .json({ mensagem: 'O nome e a duracao são obrigatórios' })
            }
          
            const curso = await Curso.findByPk(id)

            if (!curso) {
                response
                    .status(404)
                    .json({ mensagem: 'Não foi encontrado o curso' })
            }

            curso.nome = dados.nome
            curso.duracao = dados.duracao
            await curso.save()

            response.json(curso)

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao atualiza o curso'
            })
        }
    }
}
module.exports = new CursoController()