const express = require('express')

const userController = require('../Controllers/userController')
const bookController = require('../Controllers/bookController')
const orderController = require('../Controllers/orderController')

const jwtmiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
//create router object of express to define paths
const router = new express.Router()

//register API path
router.post('/register', userController.register)

// login API path
router.post('/login', userController.login)

//add book API path - https://localhost:4000/book/add
router.post('/book/add',jwtmiddleware,multerConfig.single('bookImage'),bookController.addBook)

//get all books
router.get('/book/all-books',jwtmiddleware,bookController.getAllBooks)

//update book details
router.put('/book/update-book/:bid', jwtmiddleware, multerConfig.single('bookImage'), bookController.updateBook)

//delete book
router.delete('/book/delete-book/:bid',jwtmiddleware,bookController.deleteBook)

//add order API path - https://localhost:4000/order/add
router.post('/order/add',jwtmiddleware,orderController.addOrder)

router.get('/order/view', jwtmiddleware, orderController.getAllOrders)

router.put('/order/update/:oid', jwtmiddleware, orderController.updateOrder)

router.get('/all-users', jwtmiddleware,userController.getAllUsers)

//get all books before login - homepage
router.get('/home-books', bookController.getBooks)

router.get('/order/all-orders',jwtmiddleware, orderController.getAllUsersOrders)

module.exports = router