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
    deleteIt: Boolean
    userData: UserData
  ) : [User]
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
