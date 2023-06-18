const {sequelize} = require('../database/connectdb')
const {DataTypes} = require('sequelize')
const User = require('./User')
const Book = require('./Books')
const Library = require('./library')

const Transaction = sequelize.define('Transaction', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  genreId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Library,
      key: 'id'
    }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'id'
    }
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  returnDate: {
    type: DataTypes.DATE
  }
})

// Transaction.sync()
module.exports = Transaction