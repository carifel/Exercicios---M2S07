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
}
module.exports = new CursoController()