const BooksDomain = `
  type Book {
    "This is the book id"
    id: ID!
    "This is the book name"
    name: String!
    year: Int!
    author: Author
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
  }
`
const BooksQueries = `
  Books(
    id: ID
  ): [Book]

`
const BooksMutations = `
  MergeBook
  (
    id: ID!
    name: String!
    year: Int!
  )
  : [Book]
`

export { BooksDomain, BooksQueries, BooksMutations }