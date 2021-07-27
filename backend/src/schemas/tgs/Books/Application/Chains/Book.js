import { authors } from '../../Infrastructure/authors.js'
const Book = {
  name: (parent) => {
    return parent.name
  },
  author: (parent) => {
    return authors.find(author => author.id === parent.author)
  }
}

export { Book }