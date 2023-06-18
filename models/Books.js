const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/connectdb')
const Library = require('./library')


const Book = sequelize.define('Book', {
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Library,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  copies: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Book

