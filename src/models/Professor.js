const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Curso = require("./Curso");

const Professor = connection.define("professores", {
    nome: {
        type: DataTypes.STRING
    },
   curso_id: {
        type: DataTypes.INTEGER
    }
})

Professor.belongsTo(Curso, {
    foreignKey: 'curso_id'
})
