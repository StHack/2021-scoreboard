import { createAdapter } from '@socket.io/redis-adapter'
import { initMongo } from 'db/main'
import { config } from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import { join } from 'path'
import { createClient } from 'redis'
import { registerAdminNamespace } from 'services/admin'
import {
  registerAuthentification,
  registerAuthentificationForSocket,
} from 'services/authentication'
import { registerGameNamespace } from 'services/game'
import { registerPlayerNamespace } from 'services/player'
import { getServerConfig } from 'services/serverconfig'
import { Server } from 'socket.io'
import { redisConnectionString } from 'sthack-config'

if (process.env.NODE_ENV !== 'production') {
  config()
}

const app = express()

const httpServer = createServer({}, app)

const io = new Server(httpServer, {
  transports: ['websocket'],
  path: '/api/socket',
})
const pubClient = createClient({ url: redisConnectionString() })
const subClient = pubClient.duplicate()
const serverConfigClient = pubClient.duplicate()

const serverConfig = getServerConfig(serverConfigClient as any)

initMongo()
registerAuthentification(app, io, serverConfig)

registerAuthentificationForSocket(io.of('/api/player'))
registerAuthentificationForSocket(io.of('/api/admin'))

registerGameNamespace(io.of('/api/game'), serverConfig)
registerPlayerNamespace(io.of('/api/player'))
registerAdminNamespace(
  io.of('/api/admin'),
  io.of('/api/game'),
  io.of('/api/player'),
  serverConfig,
)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'build')))
  app.get('/*', function (req, res) {
    res.sendFile(join(__dirname, 'build', 'index.html'))
  })
}

const PORT = 4400

Promise.all([
  pubClient.connect(),
  subClient.connect(),
  serverConfigClient.connect(),
]).then(() => {
  io.adapter(createAdapter(pubClient, subClient))

  httpServer.listen(PORT, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`,
    )
  })
})
