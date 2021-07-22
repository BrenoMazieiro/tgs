import { books } from '../../Infrastructure/books.js'

const MergeBook = (_, { id, name, year }, ctx) => {
  const book = books.find(book => book.id === id)
  if(!book) {
    throw new ApolloError('Book not found', 'book_not_found', {id})
  }
  book.name = name
  book.year = year
  const filteredBooks = books.filter(book => book.id !== id)
  books = [...filteredBooks, book]
  return [book]
}

export { MergeBook }