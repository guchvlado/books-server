const dbConfig = require("../config/db.config")
const {Sequelize} = require("sequelize")
const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST, 
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max, 
            min: dbConfig.pool.min, 
            acquire: dbConfig.pool.acquire, 
            idle: dbConfig.pool.idle
        }
    }
)


var db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.books = require("./book.model.js")(sequelize, Sequelize)
module.exports = db