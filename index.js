const typeDefs = require('./db/schema');
const resolvers =require('./db/resolvers');
const { ApolloServer } = require("apollo-server-express");
const mysqlConnection = require('./config/db');
require('dotenv').config({path: 'variables.env'});
const { makeExecutableSchema } = require('graphql-tools');
const express = require("express");
const routes = require('./routes');
const bodyParser = require('body-parser');



mysqlConnection.query('SELECT * FROM productos',(err, rows, fields)=>{
  if(!err){
      console.log("base de datos conectada");
      
  }else{
      console.log(err);
  }
});


const cors = require('cors');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

const server = new ApolloServer({
  uploads: false, 
  schema,   
 });
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use('/', routes());
app.use(express.static('uploads'));

server.applyMiddleware({ app });

//http://localhost:4000/graphql  grafical

const serverExpress = app.listen({port:process.env.PORT || 4000}, () => {
  console.log(`Server ready at http://localhost:4000/`);
});


