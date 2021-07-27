import { BooksDomain, BooksMutations, BooksQueries } from './Books/Domain/index.js'

const typeDefs = `#graphql

  ${BooksDomain}

  type Query {
    ${BooksQueries}
  }

  type Mutation {
    ${BooksMutations}
  }

`

export { typeDefs }
