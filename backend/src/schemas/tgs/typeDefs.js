import { UserDomain, UserChains, UserQueries, UserMutations, UserInputs } from './Users/Domain/User.js'

const typeDefs = `#graphql

  ${UserDomain}
  ${UserChains}

  type Query {
    ${UserQueries}
  }

  type Mutation {
    ${UserMutations}
  }
  
  ${UserInputs}

`

export { typeDefs }
