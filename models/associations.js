const User = require('./User')
const Book = require('./Books')
const Library = require('./library')
const Transaction = require('./Transactions')

const associations = () => {

User.hasMany(Transaction)
Library.hasMany(Book)
Book.belongsTo(Library)
Book.hasMany(Transaction)
Library.hasMany(Transaction)

}

module.exports = associations