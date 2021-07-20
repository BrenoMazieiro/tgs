import Apollo from 'apollo-server'
import GT from 'graphql-tools'

const books = [
  {
    id: '1',
    name: 'The Lord of the Rings',
    year: 1954,
    author: '1'
  },
  {
    id: '2',
    name: 'Harry Potter',
    year: 2003,
    author: '2'
  },
  {
    id: '3',
    name: 'The Silmarillion',
    year: 1992,
    author: '1'
  }
]

const authors = [
  {
    id: '1',
    name: 'J.R.R. Tolkien',
    age: 10,
  },
  {
    id: '2',
    name: 'J.K. Rowling',
    age: 20,
  }
]

const typeDefs = `

type Book {
  id: ID!
  name: String!
  year: Int!
  author: Author
}

type Author {
  id: ID!
  name: String!
  age: Int!
}


type Query {
  Books(
    id: ID
  ): [Book]
}


`
const resolvers = {
  Query: {
    Books: (_, params) => {
      if(params.id) {
        return books.filter(book => book.id === params.id)
      }
      return books
    },
  },
  Book: {
    name: (parent) => {
      return parent.name
    },
    author: (parent) => {
      return authors.find(author => author.id === parent.author)
    }
  }
}

const schema = GT.makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new Apollo.ApolloServer({
  schema,
})

server.init = () => {
  server.listen(process.env.PORT || 3000, '0.0.0.0').then(() => {
    console.log(`Server is listening on port 3000`)
  })
}

server.init()