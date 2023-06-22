const express = require('express')
const adminAuth = require('../middleware/adminauth')

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

router.route('/books').get(getAllBooks).post(adminAuth, addBooks)
router.route('/books/:id').patch(adminAuth, updateBook)
router.route('/transactions').get(getAllTransactions).post(createTransaction)
router.route('/transactions/:id').patch(updateTransaction)
router.route('/users').get(getAllUsers).delete(deleteUser)
router.route('/users/:id').patch(updateUser).delete(adminAuth, deleteUser)

module.exports = router