const { gql } = require('apollo-server-express');

const { authResponseTypeDef } = require('./auth.js');

const userSchema = gql`
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
`;


const employeeSchema = gql`
  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: Gender!
    salary: Float!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: Gender!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeById(_id: ID!): Employee
  }

  type Mutation {
    addEmployee(input: EmployeeInput!): Employee!
    updateEmployeeById(_id: ID!, input: EmployeeInput!): Employee
    deleteEmployeeById(_id: ID!): AuthResponse!
  }
`;

module.exports = { userSchema, employeeSchema };
