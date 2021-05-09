const { nanoid } = require('nanoid')
const bookself = require('./bookself')

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const id = nanoid(16)
  const finished = (pageCount === readPage)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    finished,
    insertedAt,
    updatedAt
  }

  bookself.push(newBook)

  const isSuccess = bookself.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

// kalau salah, data: booksnya diganti bookself
const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    bookself: bookself.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }))
  }
})

const getBookByIdHandler = (request, h) => {
  const { id } = request.params

  const book = bookself.filter((n) => n.id === id)[0]

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler
}
