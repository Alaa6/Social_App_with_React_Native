const bodyParser = require('body-parser'); // install body-parser
const cors = require('cors'); // install cors
const express = require('express'); // install express
const db = require('../Datastore/db');


const port = process.env.PORT || 8081;

const app = express();

const fs = require('fs') // install fs
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')
const {makeExecutableSchema}=require('graphql-tools') // install graphql-tools
const schema = makeExecutableSchema({typeDefs , resolvers})
app.use(cors(), bodyParser.json());
const {graphiqlExpress,graphqlExpress} = require('apollo-server-express') //  install apollo-server-express
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))
app.listen(port, () => console.info(`Server started on port ${port}`));