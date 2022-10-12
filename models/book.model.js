//const {sequelize, Sequelize} = require(".");
const {sequelize, Sequelize} = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    var Book = sequelize.define("book", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        available: {
            type: Sequelize.BOOLEAN
        }
    })
    return Book;
}