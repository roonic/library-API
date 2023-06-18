const express = require('express')

const {
  getAllBooks,
  addBooks,
  updateBook
} = require('../controllers/books.js')

const {
  getAllTransactions,
  createTransaction,
  updateTransaction
} = require('../controllers/transaction.js')

const {
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/users.js')

const router = express.Router()

router.route('/books').get(getAllBooks).post(addBooks)
router.route('/books/:id').patch(updateBook)
router.route('/transactions').get(getAllTransactions).post(createTransaction)
router.route('/transactions/:id').patch(updateTransaction)
router.route('/users').get(getAllUsers).delete(deleteUser)
router.route('/users/:id').patch(updateUser).delete(deleteUser)

module.exports = router