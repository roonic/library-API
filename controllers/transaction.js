const { BadRequestError, NotFoundError } = require('../errors')
const Transaction = require('../models/Transactions')
const { StatusCodes } = require('http-status-codes')
const Book = require('../models/Books')
const { Op } = require('sequelize')

const getAllTransactions = async (req, res) => {
  try {
    const { book, username } = req.query
    const queryObject = {}

    if (book) {
      const book =  await Book.findOne({
        attributes: ['id'],
        where: { 
          title: { [Op.like]: book + '%'}
        }
    })
    queryObject.bookId = book[0].dataValues.id
    }
  
    if (username) {
      const userID =  await User.findOne({
        attributes: ['id'],
        where: {...username}
    })
    queryObject.userId= userID[0].dataValues.id
    // console.log(queryObject.genre_id)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    let result = await Transaction.findAll({
      where: queryObject,
      attributes: [
        'userId', 'bookId', 'genreId', 'createdAt', 'dueDate', 'returnDate' 
      ],
      offset: skip,
      limit: limit
    })
    // console.log(result)

    res.status(StatusCodes.OK).json({result, nbHits: result.length})
  }
  catch(error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
  }
}

const updateTransaction = async(req, res) => {
  try {
    const { 
      body: { dueDate, returnDate },
      params: {id: TranId}   
    } = req
    const queryObject = {}

    // console.log(dueDate)
    if (!dueDate && !returnDate) {
      throw new BadRequestError('Due Date or Return Date required to update!')
    }

    if (dueDate) {
      queryObject.dueDate = new Date(dueDate)
    }
    if (returnDate) {
      queryObject.returnDate = new Date(returnDate)
    }

    const result = await Transaction.update(queryObject, {
        where: {
        id: TranId
      }
    })
    // console.log(result)
    res.status(StatusCodes.OK).json({result})

  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
  }
}

const createTransaction = async(req, res) => {
  try {
    const {
      body: {bookTitle},
      user: {userId},
    } = req
    // console.log(userId)
    if (!bookTitle) {
      throw new BadRequestError ('Book cannot be empty')
    }
    
    const book = await Book.findOne({
      where: {
        title: bookTitle
      },
      attributes: [
        'id', 'genre_id'
      ]
    })

    console.log(book)
    if (!book) {
      throw new NotFoundError(`No book with title ${bookTitle}`)
    }
    const now = new Date()
    const due = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const queryObject = {
      userId: userId,
      bookId: book.dataValues.id,
      genreId: book.dataValues.genre_id,
      dueDate: due
    }
    // console.log(queryObject) 
    const result = await Transaction.create({...queryObject})
    res.status(StatusCodes.CREATED).json({result})
  }
  catch(error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
  }
}

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction
}