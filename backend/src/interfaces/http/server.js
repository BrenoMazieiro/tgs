import Apollo from 'apollo-server'
import { schema } from '../../schemas/schema.js'
import { shared } from '../../shared/index.js'

const server = new Apollo.ApolloServer({
  schema,
  context: ({ req, connection }) => {
    const token = shared.core.checkToken(req, connection)
    const user = shared.core.tokenVerifier(token)
    return ({
      ...shared,
      user,
    })
  },
  formatError: (error) => {
    // eslint-disable-next-line no-param-reassign
    delete error.extensions.exception.stacktrace
    // eslint-disable-next-line no-param-reassign
    delete error.extensions.exception
    const { code } = error.extensions
    // eslint-disable-next-line no-param-reassign
    delete error.extensions.code
    const errorlog = {
      message: error.message,
      code,
      detail: error.extensions ? error.extensions : null,
      path: error.path ? error.path[0] : null,
    }
    return errorlog
  },
  formatResponse: (data) => data,
})

server.init = () => {
  server.listen(process.env.PORT || 3000, '0.0.0.0').then(() => {
    // eslint-disable-next-line no-console
    console.log('\x1b[36m%s\x1b[0m', `[${new Date()}] 🚀 INFO: Server is listening on port ${process.env.PORT || 3000}`)
  })
}

export { server }
