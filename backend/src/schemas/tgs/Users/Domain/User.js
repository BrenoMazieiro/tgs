export const UserDomain = `#graphql
  type User {
    id: ID
    name: String!
    picture: String
    email: String!
    username: String!
    isDeleted: Boolean
    role: Role
  }
  enum DeleteEnum {
    soft
    hard
  }

  type UserAuth {
    token: String!
    refreshToken: String!
  }
`

export const UserChains = `#graphql
  type Role {
    id: ID
    name: String
    code: String
    permissions: [Permission]
  }

  type Permission {
    id: ID
    code: String
    description: String
  }
`

export const UserQueries = `#graphql
  Users(
    id: ID
    deleted: Boolean
  ): [User!]!
`

export const UserMutations = `#graphql
  MergeUser(
    id: ID
    deleteIt: DeleteEnum
    userData: UserData
  ) : [User!]!

  UserSignin(
    username: String!
    password: String!
  ) : UserAuth

  RefreshUserToken (
    refreshToken: String!
  ) : UserAuth

  ValidateUser (
    approvalToken: String!
  ) : UserAuth
`

export const UserInputs = `#graphql
  input UserData {
    name: String!
    picture: String
    email: String!
    username: String!
    password: String!
  }
`
