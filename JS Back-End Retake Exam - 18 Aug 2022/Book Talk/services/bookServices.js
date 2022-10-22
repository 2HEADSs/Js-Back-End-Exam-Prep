const Book = require('../models/Book');


async function getAll() {
    return Book.find({}).lean()
}

async function createBook(book) {
    return Book.create(book)
}

async function getById(id) {
    return Book.findById(id).lean()
}

async function editById(id, data) {
    const existing = await Book.findById(id)
    existing.title = data.title
    existing.author = data.author
    existing.genre = data.genre
    existing.stars = data.stars
    existing.imageUrl = data.imageUrl
    existing.review = data.review

    return existing.save()
}

async function deleteById(id) {
    return Book.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    createBook,
    getById,
    editById,
    deleteById

}