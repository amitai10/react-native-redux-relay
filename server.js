import express from 'express'
import schema from './data/schema'
import GraphQLHTTP from 'express-graphql'

let app = express();

app.use('/graphql', GraphQLHTTP({
  schema,
  graphiql: true
}))
// app.get('/', (res, req) => res.send('hello'));
app.use(express.static('public'))

app.listen(3000);