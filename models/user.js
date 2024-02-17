const { buildSchema } = require('graphql');

const authResponseTypeDef = `
  type AuthResponse {
    success: Boolean!
    message: String
    token: String
  }
`;

const userSchema = buildSchema(`
  ${authResponseTypeDef}

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(_id: ID!): User
  }

  type Mutation {
    signup(input: UserInput!): AuthResponse!
    login(identifier: String!, password: String!): AuthResponse!
    updateUserById(_id: ID!, input: UserInput!): User
    deleteUserById(_id: ID!): AuthResponse!
  }
`);

module.exports = { userSchema, authResponseTypeDef };
