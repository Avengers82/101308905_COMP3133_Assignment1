const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const {userSchema, employeeSchema} = require('./schema.js');
const userResolver = require('./resolvers/userResolver');
const employeeResolver = require('./resolvers/employeeResolver');

const app = express();

mongoose.connect('mongodb+srv://pavansunny93:fullstack2@cluster0.0mjuas6.mongodb.net/comp3133_assignment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userServer = new ApolloServer({
  typeDefs: [userSchema],
  resolvers: [userResolver],
});

const employeeServer = new ApolloServer({
  typeDefs: [employeeSchema],
  resolvers: [employeeResolver],
});

userServer.applyMiddleware({ app, path: '/user-api' });
employeeServer.applyMiddleware({ app, path: '/employee-api' });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
