const express = require('express')
const router = express.Router()
const konyvController = require('../controllers/konyvController')

router.get('/', konyvController.view)

router.get('/admin', konyvController.adminView)
router.get('/admin/books', konyvController.adminBookView)

router.get('/view/:id', konyvController.viewBook)

router.get('/edit/:id', konyvController.editBookView)
router.post('/edit/:id', konyvController.editBook)

router.get('/new', konyvController.newBookView)
router.post('/new', konyvController.newBook)

router.post('/delete/:id', konyvController.deleteBook)

module.exports = router