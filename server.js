import fs from 'fs';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import { MongoClient } from 'mongodb';

let app = express();


// app.get('/', (res, req) => res.send('hello'));
app.use(express.static('public'));

let db;

MongoClient.connect(process.env.MONGO_URL, (err, database) => {
  if (err) throw err;

  db = database;
  let schema = Schema(db);

  app.use('/graphql', GraphQLHTTP({
    schema,
    graphiql: true
  }))

  console.log("before json");

  let json = graphql(schema, introspectionQuery).then(json => {
    fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
      if (err) throw err;

      console.log("JSON file created");
    })

  });

  app.listen(3000, () => "listen on port 3000");

  

})

// app.get('/data/links', (req, res) => {
//   db.collection("links").find({}).toArray((err, links) => {
//     if (err) throw err;

//     res.json(links);
//   })
// })


