const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const userSchema = require('./models/user.graphql');
const employeeSchema = require('./models/employee.graphql');
const userResolver = require('./userResolver');
const employeeResolver = require('./employeeResolver');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://pavansunny93:fullstack2@cluster0.0mjuas6.mongodb.net/comp3133_assignment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Apollo Server for User API
const userServer = new ApolloServer({
  typeDefs: [userSchema],
  resolvers: [userResolver],
});

// Create Apollo Server for Employee API
const employeeServer = new ApolloServer({
  typeDefs: [employeeSchema],
  resolvers: [employeeResolver],
});

// Apply middleware to set up GraphQL endpoints
userServer.applyMiddleware({ app, path: '/user-api' });
employeeServer.applyMiddleware({ app, path: '/employee-api' });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
