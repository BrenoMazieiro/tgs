import GT from 'graphql-tools'
import { resolvers } from './tgs/resolvers.js'
import { typeDefs } from './tgs/typeDefs.js'

const schema = GT.makeExecutableSchema({
  typeDefs,
  resolvers,
})

export { schema }