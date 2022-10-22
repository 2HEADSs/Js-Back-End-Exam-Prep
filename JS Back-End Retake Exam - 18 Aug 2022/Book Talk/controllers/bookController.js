const bookController = require('express').Router()

//TODO replace with real controller by assignment
bookController.get('/create', (req, res) => {
    res.render('create', {
        //title is not nessaccery I made the templete with {{title}}
        title: 'Home Page',
        user: req.user
    })
})


module.exports = bookController