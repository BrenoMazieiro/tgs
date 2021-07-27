import { ApolloError } from 'apollo-server'
import { Books } from './Books/Application/Queries/Books.js'
import { MergeBook } from './Books/Application/Mutations/MergeBook.js'
import { Book } from './Books/Application/Chains/Book.js'

const resolvers = {
  Query: {
    Books,
  },
  Mutation: {
    MergeBook,
  },
  Book,
}

export { resolvers }