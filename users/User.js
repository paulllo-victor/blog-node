const Sequelize = require("sequelize")
const connection = require("../database/database")

const User = connection.define("users",{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// User.sync({force:true})

module.exports = User