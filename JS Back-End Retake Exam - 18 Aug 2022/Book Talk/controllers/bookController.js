const { createBook } = require('../services/bookServices');
const { parseError } = require('../util/parser');

const bookController = require('express').Router()

//TODO replace with real controller by assignment
bookController.get('/create', (req, res) => {
    res.render('create', {
        //title is not nessaccery I made the templete with {{title}}
        title: 'Home Page',
        user: req.user
    })
});

bookController.post('/create', async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        stars: req.body.stars,
        imageUrl: req.body.imageUrl,
        review: req.body.review,
        owner: req.user._id
    }
    try {
        await createBook(book)
        //TODO redirect to catalog page
        res.redirect('/')
    } catch (error) {
        res.render('create', {
            errors: parseError(error),
            body: book
        })
    }
})


module.exports = bookController