import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import schema from './schema'
import path from 'path'

(async () => {
  try {
    // creating express app
    const app = express()

    // Set static folder
    app.use(express.static('public'))

    // File upload options
    const uploads = {
      maxFileSize: 1000000000,
      maxFiles: 1
    }

    // Server Instance
    const server = new ApolloServer({
      schema,
      uploads
    })

    server.applyMiddleware({
      app,
      path: '/graphql',
      cors: true
    })

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    })

    const port = process.env.PORT || 5000

    app.listen({ port })

    console.log(`Apollo GraphQL Server Running ${port}`)
  } catch (e) {
    console.log(e)
  }
})()
