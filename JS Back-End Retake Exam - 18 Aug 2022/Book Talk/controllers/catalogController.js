const { getAll } = require('../services/bookServices');
const { parseError } = require('../util/parser');

const catalogController = require('express').Router();


catalogController.get('/', async (req, res) => {
    let books = []
    try {
        books = await getAll()
        console.log(books);
        res.render('catalog', {books})

    } catch (error) {
        res.render('home', {
            errors: parseError(error)
        })
    }

})



module.exports = catalogController