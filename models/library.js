const {sequelize} = require('../database/connectdb')
const {DataTypes} = require('sequelize')

const Library = sequelize.define('Library', {
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  freezeTableName: true
})

module.exports = Library