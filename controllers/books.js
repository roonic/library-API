const Book = require('../models/Books')
const { Op } = require('sequelize')
const { StatusCodes } = require('http-status-codes')
const Library  = require('../models/library')
const { BadRequestError } = require('../errors')

const getAllBooks = async (req, res) => {
  try {
    const { title, genre, author, availability } = req.query
    const queryObject = {}

    if (title) {
      queryObject.title =  { [Op.like]: title + '%'}
    }
    
    if (author) {
      queryObject.author = { [Op.like]: author + '%'}
    }
    
    if (availability) {
      queryObject.availability = availability === 'true' ? true : false
    }

    if (genre) {
      const genreID =  await Library.findAll({
        attributes: ['id'],
        where: {
          genre: { [Op.like]: genre + '%'}
        }
    })
    queryObject.genre_id = genreID[0].dataValues.id
    console.log(queryObject.genre_id)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    let result = await Book.findAll({
      where: queryObject,
      attributes: [
        'id','genre_id', 'title', 'image', 'author', 'availability'
      ],
      offset: skip,
      limit: limit
    })
    // console.log(result)

    res.status(StatusCodes.OK).json({result, nbHits: result.length})
  }
  catch(err) {
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err})
  }
}

const updateBook = async(req, res) => {
  try {
    const { 
      body: { availability },
      params: {id: bookId}   
    } = req
    console.log(typeof(availability))
    if (availability === undefined) {
      throw new BadRequestError('Availability Required')
    }

    const result = await Book.update({availability: !!availability}, {
        where: {
        id: bookId
      }
    })
    console.log(result)
    res.status(StatusCodes.OK).json({result})

  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
  }
}

const addBooks = async(req, res) => {
  try {
    const {title, image, author, genre} = req.body
    
    if (!title && !image && !author && !genre) {
      throw new BadRequestError('Title, Image, author, genre fields cannot be empty!')
    }

    let genre_id = await Library.findOne({
      where: {
        genre: genre
      },
      attributes: [ 'id' ]
    })
    genre_id = genre_id.id
    const queryObject = {
      title,
      image,
      genre_id,
      author,
    }
    console.log(queryObject.genre_id)
    const result = await Book.create({...queryObject})
    console.log(result)
    res.status(StatusCodes.CREATED).json({result})
  }
  catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
  }
}

module.exports = {
  getAllBooks,
  addBooks,
  updateBook
}

