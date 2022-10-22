const Book = require('../models/Book');


async function getAll() {
    return Book.find({}).lean()
}

async function createBook(book) {
    return Book.create(book)
}

module.exports = {
    getAll,
    createBook

}