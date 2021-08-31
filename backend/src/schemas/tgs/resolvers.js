import Users from './Users/Application/Queries/Users.js'
import MergeUser from './Users/Application/Mutations/MergeUser.js'
import UserSignin from './Users/Application/Mutations/UserSignin.js'
import RefreshUserToken from './Users/Application/Mutations/RefreshUserToken.js'
import ValidateUser from './Users/Application/Mutations/ValidateUser.js'
import { UserChain } from './Users/Application/Chains/index.js'

const resolvers = {
  Query: {
    Users,
  },
  Mutation: {
    MergeUser,
    UserSignin,
    RefreshUserToken,
    ValidateUser,
  },
  ...UserChain,
}

export { resolvers }
