const db = require("../models")
const Book = db.books
const Op = db.Sequelize.Op

const create = async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content is not be empty!"
        })
        return
    }
    const book = {
        title: req.body.title,
        description: req.body.description,
        available: req.body.available ? req.body.available : false
    }
    const data = await Book.create(book)
    try {
        res.send(data)
    } catch (err) {
        res.status(500).send({message: err.message || "Some error occurred while creating the Book"})
    }
}
const findAll = async (req, res) => {
    const title = req.query.title
    let condition = title ? {title: {[Op.iLike]: `%${title}%`}} : null
    const data = await Book.findAll({where: condition})
    try {
        res.send(data)
    } catch (err) {
        res.status(500).send({message: err.message || "Some error occurred while retrieving books."})
    }
}
const findOne = async (req, res) => {
    const id = req.params.id
    const data = await Book.findByPk(id)
    try {
        if (data) {
            res.send(data)
        } else {
            res.status(400).send({message: `Cannot find Book with id=${id}`})
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}
const update = async (req, res) => {
    const id = req.params.id
    const num = await Book.update(req.body, {where: {id: id}})
    try{
        if (num == 1){
            res.send({message: 'Book was updated successfully'})
        } else {
            res.send({message: `Cannot update Book with id=${id}`})
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}
const deleteOne = async (req, res) => {
    const id = req.params.id
    const num = await Book.destroy({where: {id: id}})
    try {
        if (num == 1) {
            res.send({
                message: 'Book was deleted successfully'
            })
        } else {
            res.send({
                message: `Cannot delete Book with id=` + id
            })
        }
    } catch (err) {
        res.send(err.message)
    }
}
const deleteAll =async (req, res) => {
    const nums = await Book.destroy({where: {}, trancate: false})
    try {
        res.send({message: `${nums} Books were deleted successfully.`})
    } catch (err) {
        res.status(500).send({message: err.message || 'Some error occurred while removing all books'})
    }
}
const findAllAvailable = async (req, res) => {
    const data = await Book.findAll({where: {available: true}})
    try {
        res.send(data)
    } catch (err) {
        res.status(500).send({message: err.message || 'Some error occurred while retieving books.'})
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteOne,
    deleteAll,
    findAllAvailable
}