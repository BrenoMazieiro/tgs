import { server } from './interfaces/http/server.js'
import { workers } from './interfaces/workers/workers.js'

server.init()
workers.init()

const closeGracefully = async () => {
  await server.stop()
  await workers.stop()
  process.exit()
}

process.on('SIGINT', closeGracefully)
