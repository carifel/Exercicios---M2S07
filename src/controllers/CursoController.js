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

    async listaTodos(request, reponse){
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
}
module.exports = new CursoController()