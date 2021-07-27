import { books } from '../../Infrastructure/books.js'

const teste = () => {
  console.log('breno')
  return true
}

const MergeBook = (_, { id, name, year }, ctx) => {
  const book = books.find(book => book.id === id)
  if (!book) {
    throw new ApolloError('Book not found', 'book_not_found', { id })
  }
  teste()
  book.name = name
  book.year = year
  // const filteredBooks = books.filter(book => book.id !== id)
  // books = [...filteredBooks, book]
  return [book]
}

export { MergeBook }