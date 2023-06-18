const fs = require('fs')
const csv = require('csv-parser')
const { connectDB } = require('./connectdb')
const { Library } = require('../models/library')
const Book = require('../models/Books')
const {performance} = require('perf_hooks')

// fs.createReadStream('./database/genres.csv')
//   .pipe(csv())
//   .on('data', async ({id, genre}) => {
//     await Library.create({genre})
//     console.log(genre)
//   })
//   .on('end', () => console.log('library created'))

const start = performance.now();

fs.createReadStream('./database/books.csv')
  .pipe(csv())
  .on('data', async ({genre_id,title,author,image}) => {
    const data = {image,title,author,genre_id}
      // console.log(data)
    if ( title.length < 255) {
    await Book.create({...data})
    }
  })
  .on('end', () => console.log('Book database created'))

const end = performance.now()
console.log(end - start)

