const Sequelize = require("sequelize")
const connection = require("../database/database")

const Category = connection.define("categories",{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Category.sync({force:true})

module.exports = Category