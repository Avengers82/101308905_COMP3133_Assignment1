const { buildSchema } = require('graphql');
const { userSchema } = require('./user.js');

const authResponseTypeDef = userSchema.definitions
  ? userSchema.definitions
      .filter((def) => def.kind === 'ObjectTypeDefinition' && def.name.value === 'AuthResponse')
      .map((def) => def.toString())
      .join('\n')
  : '';

const employeeSchema = buildSchema(`
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
    deleteEmployeeById(_id: ID!): ${authResponseTypeDef}
  }
`);

module.exports = employeeSchema;
