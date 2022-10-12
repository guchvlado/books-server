module.exports = app => {
    const books = require('../controllers/book.controller')
    var router = require('express').Router()
    router.post('/', books.create)
    router.get('/', books.findAll)
    router.get('/available', books.findAllAvailable)
    router.get('/:id', books.findOne)
    router.put('/:id', books.update)
    router.delete('/:id', books.deleteOne)
    router.delete('/', books.deleteAll)
    app.use('/books', router)
}