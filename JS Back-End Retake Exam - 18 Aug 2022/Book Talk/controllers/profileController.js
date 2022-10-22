const { isGuest } = require('../middlewares/guard')
const { getAllWished, getAll } = require('../services/bookServices')

const profileController = require('express').Router()


profileController.get('/', isGuest(), async (req, res) => {
    const allBooks = await getAll();

    const books = allBooks.map(x => x.wishingList.toString()).includes(req.user._id.toString())
    // book.wish = books.wishingList.map(x => x.toString()).includes(req.user._id.toString())

    res.render('profile', {
        user: req.user
    })
})


module.exports = profileController
