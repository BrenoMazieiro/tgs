import { books } from '../../Infrastructure/books.js'

const Books = (_, params) => {
  if(params.id) {
    return books.filter(book => book.id === params.id)
  }
  return books
}

export { Books }