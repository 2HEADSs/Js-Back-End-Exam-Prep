const { createBook, getById, editById, deleteById } = require('../services/bookServices');
const { parseError } = require('../util/parser');

const bookController = require('express').Router()


bookController.get('/create', (req, res) => {
    res.render('create', {
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
        res.redirect('/catalog')
    } catch (error) {
        res.render('create', {
            errors: parseError(error),
            body: book
        })
    }
});

bookController.get('/:id', async (req, res) => {
    const book = await getById(req.params.id)
    const isOwner = book.owner.toString() == (req.user?._id).toString()
    res.render('details', {
        book,
        user: req.user,
        isOwner
    })
});


bookController.get('/:id/edit', async (req, res) => {
    //TODO guard for owner
    const book = await getById(req.params.id)
    const isOwner = book.owner.toString() == (req.user?._id).toString()
    if (!isOwner) {
        res.redirect('/')
    }

    res.render('edit', {
        book,
        user: req.user,
        isOwner
    })
});

bookController.post('/:id/edit', async (req, res) => {
    //TODO guard for owner
    const book = await getById(req.params.id)
    const isOwner = book.owner.toString() == (req.user?._id).toString()
    if (!isOwner) {
        res.redirect('/')
    }

    try {
        await editById(req.params.id, req.body);
        res.redirect(`/book/${req.params.id}`)
    } catch (error) {
        res.render('edit', {
            error: parseError(error),
            book,
        })
    }
});


bookController.get('/:id/delete', async (req, res) => {
    //TODO guard for owner
    const book = await getById(req.params.id)
    const isOwner = book.owner.toString() == (req.user?._id).toString()
    if (!isOwner) {
        res.redirect('/')
    }
    await deleteById(req.params.id);
    res.redirect('/catalog')

});




module.exports = bookController