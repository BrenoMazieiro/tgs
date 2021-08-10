import Users from './Users/Application/Queries/Users.js'
import { UserChain } from './Users/Application/Chains/index.js'

const resolvers = {
  Query: {
    Users,
  },
  // Mutation: {
  //   MergeBook,
  // },
  // Book,
  ...UserChain,
}

export { resolvers }
